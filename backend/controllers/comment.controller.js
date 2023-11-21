const Comment = require("../models/comment.model");

exports.createComment = async (req, res) => {
  try {
    const { post, user, text } = req.body;

    const newComment = new Comment({ post, user, text });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar o comentário", error: error.message });
  }
};

exports.getAllCommentsForPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId });

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar os comentários", error: error.message });
  }
};

exports.getAllCommentsByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const comments = await Comment.find({ user: userId });

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar os comentários", error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const updates = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(commentId, updates, {
      new: true,
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar o comentário",
      error: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    await Comment.findByIdAndRemove(commentId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Erro ao excluir o comentário",
      error: error.message,
    });
  }
};
