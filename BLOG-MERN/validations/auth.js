import {body} from 'express-validator'

export const registerValidation = [
    body('email').isEmail(), // если в теле есть imail то проверя ялвляется он им 
    body('password').isLength({min: 5 }), // если есть пароль то проверь его длину он не должен быть длинее пяти символов 
    body('fullName').isLength({min: 3}), // читай строку 5 тоже самое 
    body('avatarUrl').optional().isURL(), //  тут опцеональная проверка и так если нифы нет то все ок идем дальше если есть проверяем является ли эта информация ссылкой  
]