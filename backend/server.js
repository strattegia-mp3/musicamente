const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const expressSanitizer = require("express-sanitizer");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const errorHandler = require("./middlewares/error.middleware");
const fs = require("fs");
const path = require("path");
const upload = require("./middlewares/multer.middleware");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(expressSanitizer());
app.use(morgan("combined"));
app.use(limiter);
app.use(errorHandler);
app.post("/upload", upload.single("image"), (req, res, next) => {
  if (!req.file) {
    const err = new Error("Nenhum arquivo foi enviado!");
    err.status = 400;
    next(err);
    return;
  }
  res.json({
    message: "Imagem enviada com sucesso",
    file: req.file,
  });
});

// Routes
app.get("/", (req, res) => {
  res.send("Backend server is working!");
});

const routeFiles = fs.readdirSync(path.join(__dirname, "routes"));

routeFiles.forEach((routeFile) => {
  if (routeFile.endsWith(".js")) {
    const route = require(`./routes/${routeFile}`);
    app.use(`/api`, route);
  }
});

const { MONGO_URI, EXPO_PUBLIC_PORT } = process.env;

const connectWithRetry = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })
    .catch((err) => {
      console.error(
        "Failed to connect to the database on startup - retrying in 5 sec",
        err
      );
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Error connecting to the database: ")
);
db.once("open", () => {
  console.log("Database connection established.");
});

app.listen(EXPO_PUBLIC_PORT, () => {
  console.log(`Listening in port ${EXPO_PUBLIC_PORT}.`);
});
