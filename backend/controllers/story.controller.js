const Story = require("../models/story.model");

exports.createStory = async (req, res) => {
  try {
    const { user, mediaType, mediaUrl, expiresAt } = req.body;

    const newStory = new Story({ user, mediaType, mediaUrl, expiresAt });

    await newStory.save();

    res.status(201).json(newStory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar a história", error: error.message });
  }
};

exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().populate("user", "username");

    res.status(200).json(stories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar as histórias", error: error.message });
  }
};

exports.getStoriesByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const stories = await Story.find({ user: userId });

    res.status(200).json(stories);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro ao buscar as histórias do usuário",
        error: error.message,
      });
  }
};
