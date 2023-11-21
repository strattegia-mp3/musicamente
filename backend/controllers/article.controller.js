const Article = require("../models/article.model");

exports.createArticle = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    const newArticle = new Article({ title, content, author, tags });

    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar o artigo", error: error.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "username");

    res.status(200).json(articles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar os artigos", error: error.message });
  }
};

exports.getArticlesByAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;

    const articles = await Article.find({ author: authorId });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar os artigos do autor",
      error: error.message,
    });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const updates = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(articleId, updates, {
      new: true,
    });

    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar o artigo",
      error: error.message,
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    await Article.findByIdAndRemove(articleId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Erro ao excluir o artigo",
      error: error.message,
    });
  }
};
