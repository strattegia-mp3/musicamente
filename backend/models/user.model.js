const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return v.length >= 3 && !/\s/.test(v);
        },
        message:
          "O nome de usuário deve ter no mínimo 3 caracteres e não pode conter espaços.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          var re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(v);
        },
        message: (props) => `${props.value} não é um email válido!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    profileImage: { type: String, required: true },
    bio: {
      type: String,
      default: "Nenhuma biografia informada.",
      validate: {
        validator: function (v) {
          return v.length <= 150;
        },
        message: "A biografia não pode ter mais de 150 caracteres.",
      },
    },
    phone: { type: Number, required: true, unique: true },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "non-binary", "other"],
      validate: {
        validator: function (v) {
          return v !== "other" || this.customGender;
        },
        message:
          "Se o gênero for 'other', você precisa fornecer um gênero personalizado.",
      },
    },
    customGender: {
      type: String,
      validate: {
        validator: function (v) {
          return this.gender !== "other" || v;
        },
        message:
          "Se você fornecer um gênero personalizado, o gênero deve ser 'Outro'.",
      },
    },
    birthdate: { type: String, required: true },
    address: {
      zipCode: String,
      address: String,
      neighborhood: String,
      number: Number,
      complement: String,
      state: String,
      city: String,
    },
    musicGenres: [String],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
