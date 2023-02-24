import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import User from "../models/User.model.js";

export const register = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const Hash = await bcrypt.hash(password, salt);

    const doc = new User({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: Hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret_key",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error); // тут мы выводим ошибку в кансоль для разработчика
    return res.status(500).json({
      // ответ для пользователя
      messag: "Не удалось зарегестрировать пользователя",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "Неверный логин или пароль ",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль ",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret_key",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error); // тут мы выводим ошибку в кансоль для разработчика
    return res.status(500).json({
      // ответ для пользователя
      messag: "Не удалось авторизоваться ",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найдет",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({
      userData,
    });
  } catch (error) {
    console.log(error); // тут мы выводим ошибку в кансоль для разработчика
    return res.status(500).json({
      // ответ для пользователя
      messag: "Нет доступа",
    });
  }
};
