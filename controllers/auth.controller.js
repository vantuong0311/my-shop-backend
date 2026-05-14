const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const UserService = require("../services/user.service");

const createToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        }
    );
};

const register = async (req, res) => {
    try {
        const user = await UserService.create(req.body);
        const token = createToken(user);

        return res.status(201).json({
            message: "dang ky tai khoan thanh cong"
        });
    } catch (error) {
        const statusCode = error.message === "email da ton tai" ? 409 : 400;

        return res.status(statusCode).json({
            message: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "vui long nhap email va password",
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        if (!user) {
            return res.status(401).json({
                message: "email hoac password khong dung",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: "tai khoan da bi khoa",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "email hoac password khong dung",
            });
        }

        const token = createToken(user);
        const userData = user.toObject();

        delete userData.password;
        delete userData.otpCode;
        delete userData.otpExpires;

        return res.status(200).json({
            message: "dang nhap thanh cong",
            token,
            user: userData,
        });
    } catch (error) {
        return res.status(500).json({
            message: "loi server khi dang nhap",
            error: error.message,
        });
    }
};

module.exports = {
    register,
    login,
};
