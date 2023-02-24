import express from "express";
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

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get('/posts',PostController.getAll);
app.get('/posts/:id',  PostController.getOne);
app.post("/posts", checkAuth, postValidation, PostController.create);
// app.delete('/post', checkAuth, PostController.remove);
// app.patch('/post', checkAuth, PostController.updete);

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
