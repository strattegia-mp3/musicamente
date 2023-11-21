const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  try {
    const { user, text } = req.body;

    const newPost = new Post({ user, text });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar a postagem", error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username");

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar as postagens", error: error.message });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({ user: userId });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar as postagens do usuário",
      error: error.message,
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;

    await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });

    res.status(200).json({ message: "Postagem curtida com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao curtir a postagem", error: error.message });
  }
};

exports.dislikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;

    await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });

    res.status(200).json({ message: "Postagem descurtida com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao descurtir a postagem", error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { user, text } = req.body;

    const newComment = { user, text };

    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao adicionar o comentário",
      error: error.message,
    });
  }
};

exports.editComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const { text } = req.body;

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, "comments._id": commentId },
      { $set: { "comments.$.text": text } },
      { new: true }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ message: "Comentário ou postagem não encontrados" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao editar o comentário", error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ message: "Comentário ou postagem não encontrados" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao excluir o comentário", error: error.message });
  }
};

exports.editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { text },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Postagem não encontrada" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao editar a postagem", error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await Post.findByIdAndRemove(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Postagem não encontrada" });
    }

    res.status(200).json({ message: "Postagem excluída com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao excluir a postagem", error: error.message });
  }
};
