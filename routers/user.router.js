const express = require("express");
const UserController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { requireAdmin, requireAdminOrSelf } = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", authMiddleware, requireAdmin, UserController.getAllUser);
router.get("/:id", authMiddleware, requireAdminOrSelf, UserController.getUserById);
router.post("/", authMiddleware, requireAdmin, UserController.createUser);
router.put("/:id", authMiddleware, requireAdminOrSelf, UserController.updateUser);

module.exports = router;
