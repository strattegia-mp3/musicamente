const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");

router.post("/categories", categoryController.createCategory);
router.get("/categories", categoryController.getAllCategories);
router.patch("/categories/:id", categoryController.editCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

module.exports = router;
