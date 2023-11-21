const { Category } = require("../models/forum.model");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCategory = new Category({ name, description });

    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar a categoria", error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar as categorias", error: error.message });
  }
};

exports.editCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao editar a categoria", error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    res.status(200).json({ message: "Categoria excluída com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao excluir a categoria", error: error.message });
  }
};
