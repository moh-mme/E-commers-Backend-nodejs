
const { validationResult } = require('express-validator');
const { Users } = require('../data/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ status: 400, errors: result.array() });
    }

    // Find user
    const user = Users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    // Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
};

module.exports = { login };