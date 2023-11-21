const Conversation = require("../models/conversation.model");

exports.createConversation = async (req, res) => {
  try {
    const { type, participants } = req.body;

    const newConversation = new Conversation({ type, participants });

    await newConversation.save();

    res.status(201).json(newConversation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar a conversa", error: error.message });
  }
};

exports.getConversationsByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const conversations = await Conversation.find({ participants: userId });

    res.status(200).json(conversations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar as conversas", error: error.message });
  }
};

exports.updateConversation = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const updates = req.body;

    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversationId,
      updates,
      {
        new: true,
      }
    );

    res.status(200).json(updatedConversation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar a conversa", error: error.message });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const conversationId = req.params.id;

    await Conversation.findByIdAndRemove(conversationId);

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao excluir a conversa", error: error.message });
  }
};
