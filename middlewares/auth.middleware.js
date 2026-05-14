const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "chua dang nhap hoac thieu token",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select(
            "-password -otpCode -otpExpires"
        );

        if (!user) {
            return res.status(401).json({
                message: "token khong hop le",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: "tai khoan da bi khoa",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "token khong hop le hoac da het han",
        });
    }
};

module.exports = authMiddleware;
