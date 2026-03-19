const { validationResult } = require('express-validator');
const { Users } = require('../data/Users');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    // تحقق من validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // تحقق من وجود المستخدم مسبقًا
        const existingUser = Users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // تشفير الباسورد
        const hashedPassword = await bcrypt.hash(password, 10); // saltRounds = 10

        // إنشاء المستخدم
        const newUser = {
            id: Users.length + 1, // فقط للـ mock DB
            name,
            email,
            password: hashedPassword,
            role: 'customer' // افتراضيًا كل المستخدمين الجدد هم عملاء   
        };

        Users.push(newUser);

        return res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser.id, username: newUser.username, email: newUser.email }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register };