const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Acesso negado" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decoded.userId);

    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;
