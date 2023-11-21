const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { JWT_SECRET, EMAIL_USER, EMAIL_PWD, CLIENT_URL } = process.env;

const generatePasswordResetToken = (user) => {
  const payload = {
    userId: user._id,
    expiresIn: "1h",
  };
  const secret = JWT_SECRET;
  return jwt.sign(payload, secret);
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PWD,
  },
});

const sendPasswordResetEmail = (user, resetToken) => {
  const resetLink = `${CLIENT_URL}/reset-password?token=${resetToken}`;
  const mailOptions = {
    from: EMAIL_USER,
    to: user.email,
    subject: "Recuperação de Senha",
    html: `Clique no link a seguir para redefinir sua senha: <a href="${resetLink}">${resetLink}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar e-mail de recuperação de senha: " + error);
    } else {
      console.log("E-mail de recuperação de senha enviado: " + info.response);
    }
  });
};

exports.checkField = async (req, res) => {
  try {
    const { field, value } = req.query;
    if (!field || !value) {
      return res.status(400).json({ message: "Parâmetros inválidos" });
    }
    const user = await User.findOne({ [field]: value });

    res.json({ isRegistered: !!user });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Erro ao checar o campo`, error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      name,
      phone,
      bio,
      profileImage,
      gender,
      customGender,
      birthdate,
      address,
      musicGenres,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const newUser = new User({
      username,
      email,
      password,
      name,
      phone,
      bio,
      profileImage,
      gender,
      customGender,
      birthdate,
      address,
      musicGenres,
    });

    await newUser.save();

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar o usuário", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });
    res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
};

exports.sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const verificationCode = generateVerificationCode();
    user.verificationCode = verificationCode;
    await user.save();

    sendVerificationCodeEmail(user, verificationCode);

    res
      .status(200)
      .json({ message: "Código de verificação enviado com sucesso" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao enviar o código de verificação",
      error: error.message,
    });
  }
};

exports.validateVerificationCode = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (user.verificationCode !== verificationCode) {
      return res
        .status(401)
        .json({ message: "Código de verificação inválido" });
    }

    res
      .status(200)
      .json({ message: "Código de verificação validado com sucesso" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao validar o código de verificação",
      error: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Senha atual incorreta" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Senha alterada com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao alterar a senha", error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const resetToken = generatePasswordResetToken(user);
    sendPasswordResetEmail(user, resetToken);

    res
      .status(200)
      .json({ message: "E-mail de recuperação de senha enviado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro na recuperação de senha", error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedNewPassword;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({ message: "Senha redefinida com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro na redefinição de senha", error: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({
      message: "Deslogado com sucesso!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro no logout de usuário", error: error.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate("followers", "username");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const followers = user.followers;

    res.status(200).json({ followers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter seguidores", error: error.message });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate("following", "username");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const following = user.following;

    res.status(200).json({ following });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter contas seguidas", error: error.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followerId = req.params.followerId;

    if (userId === followerId) {
      return res
        .status(400)
        .json({ message: "Você não pode seguir a si mesmo." });
    }

    const userToFollow = await User.findById(userId);

    if (!userToFollow) {
      return res
        .status(404)
        .json({ message: "Usuário a ser seguido não encontrado" });
    }

    const follower = await User.findById(followerId);

    if (!follower) {
      return res
        .status(404)
        .json({ message: "Usuário que está seguindo não encontrado" });
    }

    userToFollow.followers.push(followerId);
    await userToFollow.save();

    res.status(200).json({ message: "Usuário seguido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao seguir o usuário", error: error.message });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const followerId = req.params.followerId;

    if (userId === followerId) {
      return res
        .status(400)
        .json({ message: "Você não pode deixar de seguir a si mesmo." });
    }

    const userToUnfollow = await User.findById(userId);

    if (!userToUnfollow) {
      return res
        .status(404)
        .json({ message: "Usuário a ser deixado de seguir não encontrado" });
    }

    const follower = await User.findById(followerId);

    if (!follower) {
      return res
        .status(404)
        .json({ message: "Usuário que está seguindo não encontrado" });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== followerId
    );

    await userToUnfollow.save();

    res.status(200).json({ message: "Usuário deixado de seguir com sucesso" });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao deixar de seguir o usuário",
      error: error.message,
    });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const blockerId = req.params.blockerId;

    if (userId === blockerId) {
      return res
        .status(400)
        .json({ message: "Você não pode bloquear a si mesmo." });
    }

    const userToBlock = await User.findById(userId);

    if (!userToBlock) {
      return res
        .status(404)
        .json({ message: "Usuário a ser bloqueado não encontrado" });
    }

    const blocker = await User.findById(blockerId);

    if (!blocker) {
      return res
        .status(404)
        .json({ message: "Usuário que está bloqueando não encontrado" });
    }

    if (!blocker.blockedUsers.includes(userId)) {
      blocker.blockedUsers.push(userId);
    }

    await blocker.save();

    res.status(200).json({ message: "Usuário bloqueado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao bloquear o usuário", error: error.message });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const unblockerId = req.params.unblockerId;

    const userToUnblock = await User.findById(userId);

    if (!userToUnblock) {
      return res
        .status(404)
        .json({ message: "Usuário a ser desbloqueado não encontrado" });
    }

    const unblocker = await User.findById(unblockerId);

    if (!unblocker) {
      return res
        .status(404)
        .json({ message: "Usuário que está desbloqueando não encontrado" });
    }

    unblocker.blockedUsers = unblocker.blockedUsers.filter(
      (id) => id.toString() !== userId
    );

    await unblocker.save();

    res.status(200).json({ message: "Usuário desbloqueado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao desbloquear o usuário", error: error.message });
  }
};

exports.notificationSettings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const settings = req.body;

    if (userId !== req.user.id) {
      return res.status(403).json({
        message:
          "Você não tem permissão para atualizar as configurações deste usuário",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    user.notificationSettings = settings.notificationSettings;
    user.accountSettings = settings.accountSettings;

    await user.save();

    res.status(200).json({ message: "Configurações atualizadas com sucesso" });
  } catch (error) {
    res.status(500).json({
      message: "Erro nas configurações de notificação",
      error: error.message,
    });
  }
};

exports.activityHistory = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const activityHistory = user.activityHistory;

    res.status(200).json({ activityHistory });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao obter o histórico de atividades",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar os usuários", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar as informações do usuário",
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar as informações do usuário",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar o usuário",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndRemove(userId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Erro ao excluir o usuário",
      error: error.message,
    });
  }
};
