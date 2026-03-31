const { body } = require('express-validator')

const userValidator = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First Name is Required')
        .isLength({ min: 3 })
        .withMessage("Minimum characters is 3"),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is Required')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is Required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
        .withMessage('Password must contain both letters and numbers')
]

module.exports = { userValidator }