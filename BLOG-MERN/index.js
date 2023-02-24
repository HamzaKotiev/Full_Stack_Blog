import express from "express";
import multer from "multer";
import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postValidation,
} from "./validations.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

import checkAuth from "./Middleware/checkAuth.js";

const app = express();

mongoose
  .connect(
    "mongodb+srv://HamzatKot:19082002@cluster0.0qerfhd.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

app.use(express.json());

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

app.post('/uploads', checkAuth, uploads.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.updete);

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
