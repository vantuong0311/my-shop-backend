const UserService = require("../services/user.service");

const UserController = {
    getAllUser: async (req, res) => {
        try {
            const users = await UserService.getAllUser();

            return res.status(200).json({
                message: "lay danh sach user thanh cong",
                users,
            });
        } catch (error) {
            return res.status(500).json({
                message: "loi server khi lay danh sach user",
                error: error.message,
            });
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);

            return res.status(200).json({
                message: "lay thong tin user thanh cong",
                user,
            });
        } catch (error) {
            return res.status(404).json({
                message: error.message,
            });
        }
    },

    createUser: async (req, res) => {
        try {
            const user = await UserService.create(req.body);

            return res.status(201).json({
                message: "tao user thanh cong",
                user,
            });
        } catch (error) {
            const statusCode = error.message === "email da ton tai" ? 409 : 400;

            return res.status(statusCode).json({
                message: error.message,
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserService.update(id, req.body);

            return res.status(200).json({
                message: "cap nhat user thanh cong",
                user,
            });
        } catch (error) {
            const statusCode = error.message === "email da ton tai" ? 409 : 404;

            return res.status(statusCode).json({
                message: error.message,
            });
        }
    },
};

module.exports = UserController;
