const {body} = require('express-validator')

const loginValidator = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is Required')
        .isEmail()
        .withMessage('Invalid Email'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is Required')
        .isLength({min:8})
        .withMessage('Password must be at least 6 characters')
]

module.exports = {loginValidator}