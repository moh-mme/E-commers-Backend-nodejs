const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Authorization: Bearer <token>

    if (!token) return res.status(401).json({ status: 401, msg: "Access Denied" });

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // نضيف بيانات المستخدم للـ request
        next();
    } catch (err) {
        return res.status(403).json({ status: 403, msg: "Invalid Token" });
    }
};



module.exports = authenticateToken;