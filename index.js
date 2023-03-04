import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from 'cors'

import {
  registerValidation,
  loginValidation,
  postValidation,
} from "./validations.js";

import { checkAuth, hendleValidationErrors } from "./Middleware/index.js";
import { UserController, PostController } from "./controllers/index.js";

const app = express();

mongoose
  .connect(
    "mongodb+srv://HamzatKot:19082002@cluster0.0qerfhd.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

app.use(express.json());
app.use(cors())

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});


app.use("/uploads", express.static("uploads"));
const upload = multer({ storage });

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});



app.post(
  "/auth/login",
  loginValidation,
  hendleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  hendleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get('/tags', PostController.getLasTags)

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postValidation,
  hendleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postValidation,
  hendleValidationErrors,
  PostController.updete
);

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
