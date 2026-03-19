const jwt = require('jsonwebtoken');

const acRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const userRole = req.user.role?.toLowerCase();

        if (!roles.map(r => r.toLowerCase()).includes(userRole)) {
            return res.status(403).json({ msg: "Access Denied" });
        }

        next();
    };
};


module.exports = { acRoles };