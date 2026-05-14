const express = require("express");
const CategoryController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { requireAdmin } = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.post("/", authMiddleware, requireAdmin, CategoryController.create);
router.put("/:id", authMiddleware, requireAdmin, CategoryController.update);
router.delete("/:id", authMiddleware, requireAdmin, CategoryController.delete);

module.exports = router;
