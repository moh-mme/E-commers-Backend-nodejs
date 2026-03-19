const express = require('express');
const { userValidator } = require('../middelwere/user.validator')
const authenticateToken = require('../middelwere/authonticatToken')
const { acRoles } = require('../middelwere/accessAPI')

const userRouter = express.Router()



const { getAllUsers, getSingleuser, createNewUser, updateUser, deleteUser, loginUser } = require('../controller/Users.controler')

userRouter.route('/')
    .get(authenticateToken, acRoles('manager'), getAllUsers)
userRouter.route('/register')
    .post(userValidator, createNewUser)
userRouter.route('/login')
    .post(loginUser)
userRouter.route('/:userId')
    .get(getSingleuser)
    .patch(authenticateToken, updateUser)
    .delete(authenticateToken, deleteUser)


module.exports = { userRouter }