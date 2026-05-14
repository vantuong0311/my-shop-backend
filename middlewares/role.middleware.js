const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "chi admin moi co quyen thuc hien chuc nang nay",
        });
    }

    next();
};

const requireAdminOrSelf = (req, res, next) => {
    const { id } = req.params;
    const currentUserId = req.user?._id?.toString();

    if (req.user?.role === "admin" || currentUserId === id) {
        return next();
    }

    return res.status(403).json({
        message: "ban khong co quyen thuc hien chuc nang nay",
    });
};

module.exports = {
    requireAdmin,
    requireAdminOrSelf,
};
