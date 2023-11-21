const { Topic } = require("../models/forum.model");

exports.createTopic = async (req, res) => {
  try {
    const { user, category, title, content } = req.body;

    const newTopic = new Topic({ user, category, title, content });

    await newTopic.save();

    res.status(201).json(newTopic);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar o tópico", error: error.message });
  }
};

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate("user", "username")
      .populate("category", "name");

    res.status(200).json(topics);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar os tópicos", error: error.message });
  }
};

exports.getTopicsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const topics = await Topic.find({ user: userId })
      .populate("user", "username")
      .populate("category", "name");

    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar os tópicos do usuário",
      error: error.message,
    });
  }
};

exports.createReply = async (req, res) => {
  try {
    const { user, topic, content } = req.body;

    const newReply = {
      user,
      content,
    };

    const updatedTopic = await Topic.findByIdAndUpdate(
      topic,
      { $push: { replies: newReply } },
      { new: true }
    );

    if (!updatedTopic) {
      return res.status(404).json({ message: "Tópico não encontrado" });
    }

    res.status(201).json(updatedTopic.replies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar a resposta", error: error.message });
  }
};

exports.getAllReplies = async (req, res) => {
  try {
    const topicId = req.params.topicId;

    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({ message: "Tópico não encontrado" });
    }

    const replies = topic.replies;

    res.status(200).json(replies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar as respostas", error: error.message });
  }
};

exports.getRepliesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const replies = await Topic.find(
      { "replies.user": userId },
      { "replies.$": 1 }
    );

    res.status(200).json(replies);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro ao buscar as respostas do usuário",
        error: error.message,
      });
  }
};

exports.editReply = async (req, res) => {
  try {
    const topicId = req.params.topicId;
    const replyId = req.params.replyId;
    const { content } = req.body;

    const updatedTopic = await Topic.findOneAndUpdate(
      { _id: topicId, "replies._id": replyId },
      { $set: { "replies.$.content": content } },
      { new: true }
    );

    if (!updatedTopic) {
      return res.status(404).json({ message: "Resposta não encontrada" });
    }

    const updatedReply = updatedTopic.replies.find(
      (reply) => reply._id.toString() === replyId
    );

    res.status(200).json(updatedReply);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao editar a resposta", error: error.message });
  }
};

exports.deleteReply = async (req, res) => {
  try {
    const topicId = req.params.topicId;
    const replyId = req.params.replyId;

    const updatedTopic = await Topic.findOneAndUpdate(
      { _id: topicId },
      { $pull: { replies: { _id: replyId } } },
      { new: true }
    );

    if (!updatedTopic) {
      return res.status(404).json({ message: "Resposta não encontrada" });
    }

    res.status(200).json({ message: "Resposta excluída com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao excluir a resposta", error: error.message });
  }
};

exports.editTopic = async (req, res) => {
  try {
    const topicId = req.params.id;
    const { title, content } = req.body;

    const updatedTopic = await Topic.findByIdAndUpdate(
      topicId,
      { title, content },
      { new: true }
    );

    if (!updatedTopic) {
      return res.status(404).json({ message: "Tópico não encontrado" });
    }

    res.status(200).json(updatedTopic);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao editar o tópico", error: error.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const topicId = req.params.id;

    const deletedTopic = await Topic.findByIdAndRemove(topicId);

    if (!deletedTopic) {
      return res.status(404).json({ message: "Tópico não encontrado" });
    }

    res.status(200).json({ message: "Tópico excluído com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao excluir o tópico", error: error.message });
  }
};
