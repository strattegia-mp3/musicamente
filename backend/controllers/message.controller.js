const Message = require("../models/message.model");

exports.createMessage = async (req, res) => {
  try {
    const { text, user } = req.body;

    const newMessage = new Message({ text, user });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar a mensagem", error: error.message });
  }
};

exports.getMessagesInConversation = async (req, res) => {
  try {
    const conversationId = req.params.id;

    const messages = await Message.find({
      _id: { $in: conversation.messages },
    });

    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar as mensagens", error: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const updates = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(messageId, updates, {
      new: true,
    });

    res.status(200).json(updatedMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar a mensagem", error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;

    await Message.findByIdAndRemove(messageId);

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao excluir a mensagem", error: error.message });
  }
};
