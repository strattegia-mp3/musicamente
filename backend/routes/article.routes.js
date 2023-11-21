const express = require("express");
const router = express.Router();

const articleController = require("../controllers/article.controller");

router.post("/articles", articleController.createArticle);
router.get("/articles", articleController.getAllArticles);
router.get("/users/:id/articles", articleController.getArticlesByAuthor);
router.patch("/articles/:id", articleController.updateArticle);
router.delete("/articles/:id", articleController.deleteArticle);

module.exports = router;
