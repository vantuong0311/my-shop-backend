const CategoryService = require("../services/category.service");

const CategoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await CategoryService.getAll();
            return res.status(200).json({ message: "lay danh muc thanh cong", categories });
        } catch (error) {
            return res.status(500).json({ message: "loi server", error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const category = await CategoryService.getById(req.params.id);
            return res.status(200).json({ message: "lay danh muc thanh cong", category });
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const category = await CategoryService.create(req.body);
            return res.status(201).json({ message: "tao danh muc thanh cong", category });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const category = await CategoryService.update(req.params.id, req.body);
            return res.status(200).json({ message: "cap nhat danh muc thanh cong", category });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await CategoryService.delete(req.params.id);
            return res.status(200).json({ message: "xoa danh muc thanh cong" });
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },
};

module.exports = CategoryController;
