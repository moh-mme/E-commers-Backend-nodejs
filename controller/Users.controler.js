const { Users } = require('../data/Users');
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const { User } = require('../model/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password', 'userName', 'email'] } // استبعاد كلمة المرور
        });
        res.status(200).json({ status: 200, data: users });
    } catch (error) {
        res.status(500).json({ status: 500, msg: "Internal Server Error" });
    }
};

const getSingleuser = async (req, res) => {
    const userId = +req.params.userId;
    if (isNaN(userId)) {
        return res.status(400).json({ msg: "Invalid user id" });
    }
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ status: 404, msg: "User Not Found" })
    }
    res.status(200).json({
        status: 200, data: {
            id: user.user_id,
            name: user.name,
            email: user.email,
            phone: user.phone
        }
    });
}

const createNewUser = async (req, res) => {
    const result = validationResult(req);
    const oldUserEmail = await User.findOne({ where: { email: req.body.email } })
    const oldUserUserName = await User.findOne({ where: { userName: req.body.userName } })
    if (oldUserEmail) {
        return res.status(400).json({ status: 400, msg: "Email already exists" })
    }
    if (oldUserUserName) {
        return res.status(400).json({ status: 400, msg: "Username already exists" })
    }
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const newuser = await User.create(req.body)
        return res.status(201).json({ status: 201, msg: "User Created Successfully" });
    } catch (error) {
        return res.status(500).json({ status: 500, msg: "Internal Server Error" })
    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ status: 400, errors: result.array() });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ status: 404, msg: "User Not Found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: 400, msg: "Email Or Password is incorrect" });
        }
        const payload = {
            id: user.id,
            username: user.userName,
            role: user.role
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ status: 500, msg: "Internal Server Error" })
    }
}

const updateUser = async (req, res) => {
    const userId = +req.params.userId;

    // تأكد أن المستخدم صاحب الحساب نفسه
    if (req.user.id !== userId) {
        return res.status(403).json({ status: 403, msg: "You are not allowed to update this account" });
    }
    if (req.user.role !== 'manager' && req.user.id !== userId) {
        return res.status(403).json({ status: 403, msg: "You are not allowed to update this account" });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ status: 404, msg: "User Not Found" });

        // Hash password إذا تم تغييره
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        await user.update(req.body);

        const { password, ...userData } = user.toJSON();
        res.status(200).json({ status: 200, data: userData });

    } catch (error) {
        res.status(500).json({ status: 500, msg: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    const userId = +req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ status: 404, msg: "User Not Found" })
    }
    await user.destroy();
    res.status(200).json({ status: 200, msg: "User Deleted Successfully" })
}


module.exports = {
    getAllUsers,
    getSingleuser,
    createNewUser,
    updateUser,
    deleteUser,
    loginUser
}