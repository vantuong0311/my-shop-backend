const Category = require("../models/category.model");

const makeSlug = (value) => {
    return value
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const CategoryService = {
    getAll: async () => {
        return Category.find().sort({ createdAt: -1 });
    },

    getById: async (id) => {
        const category = await Category.findById(id);

        if (!category) {
            throw new Error("khong tim thay danh muc");
        }

        return category;
    },

    create: async (data) => {
        const { name, description, image, isActive } = data;

        if (!name) {
            throw new Error("ten danh muc la bat buoc");
        }

        const slug = data.slug ? makeSlug(data.slug) : makeSlug(name);
        const existingCategory = await Category.findOne({ slug });

        if (existingCategory) {
            throw new Error("slug danh muc da ton tai");
        }

        return Category.create({
            name,
            slug,
            description,
            image,
            isActive,
        });
    },

    update: async (id, data) => {
        const category = await Category.findById(id);

        if (!category) {
            throw new Error("khong tim thay danh muc");
        }

        const updateData = { ...data };

        if (data.slug || data.name) {
            const slug = data.slug ? makeSlug(data.slug) : makeSlug(data.name);
            const existingCategory = await Category.findOne({
                slug,
                _id: { $ne: id },
            });

            if (existingCategory) {
                throw new Error("slug danh muc da ton tai");
            }

            updateData.slug = slug;
        }

        return Category.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
    },

    delete: async (id) => {
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            throw new Error("khong tim thay danh muc");
        }

        return category;
    },
};

module.exports = CategoryService;
