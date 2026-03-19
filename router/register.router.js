const express = require('express');
const registerRouter = express.Router()
const { register } = require('../controller/register.controler')
const { registerValidator } = require('../middelwere/register.validation')
registerRouter.route('/')
                .post(registerValidator ,register)

module.exports = {registerRouter}