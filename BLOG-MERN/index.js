import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt"


import { validationResult } from 'express-validator'
import { registerValidation } from './validations/auth.js'

import {userController} from './controllers/UserController'
import checkAuth from './Middleware/checkAuth.js'

const app = express();

mongoose.connect('mongodb+srv://HamzatKot:19082002@cluster0.0qerfhd.mongodb.net/Blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

app.use(express.json())


app.post('/auth/login', async (req, res) => { })

app.post('/auth/register', registerValidation, async (req, res) => { })

app.get('/auth/me', checkAuth, async (req, res) => { })


app.listen(4000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})