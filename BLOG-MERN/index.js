import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt"


import { validationResult } from 'express-validator'
import { registerValidation } from './validations/auth.js'

import UserModel from './models/User.model.js'

const app = express();

mongoose.connect('mongodb+srv://HamzatKot:19082002@cluster0.0qerfhd.mongodb.net/Blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({
                message: 'Неверный логин или пароль ',
            });
        }


        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        
        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль ',
            });
        }

    

    const token = jwt.sign({
        _id: user._id,
    },'secret_key',
    {
        expiresIn: '30d'
    })

    const { passwordHash, ...userData} = user._doc

    res.json({
        ...userData,
        token,
    });


    } catch (error) {
        console.log(error); // тут мы выводим ошибку в кансоль для разработчика 
        return res.status(500).json({ // ответ для пользователя 
            messag: 'Не удалось авторизоваться '
        })
    }
})

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error.array());

    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const Hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: Hash,
    });

    const user = await doc.save();

    const token = jwt.sign({
        _id: user._id,
    },'secret_key',
    {
        expiresIn: '30d'
    })

    const { passwordHash, ...userData} = user._doc

    res.json({
        ...userData,
        token,
    });
    } catch (error) {
        console.log(error); // тут мы выводим ошибку в кансоль для разработчика 
        return res.status(500).json({ // ответ для пользователя 
            messag: 'Не удалось зарегестрировать пользователя'
        })
    }
})
app.listen(4000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})