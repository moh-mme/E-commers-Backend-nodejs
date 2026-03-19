const express = require('express');
const loginRouter = express.Router()
const { login } = require('../controller/login.controler')
const { loginValidator } = require('../middelwere/login.validation')
loginRouter.route('/')
                .post(loginValidator ,login)

module.exports = {loginRouter}