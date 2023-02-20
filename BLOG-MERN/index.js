import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


import { validationResult } from 'express-validator'
import { registerValidation } from './validations/auth.js'

const app = express();

mongoose.connect('mongodb+srv://HamzatKot:19082002@cluster0.0qerfhd.mongodb.net/Blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/login', registerValidation, (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error.array());

    }
    res.json({
        success: true
    })
})
app.listen(4000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
})