const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const UserService = {
    // lay danh sach
    getAllUser: async () => {
        const user = await User.find()
            .select("-password -otpCode -otpExpires")
            .sort({ createdAt: -1 });
        return user;

    },
    getUserById: async (id) => {
        const user = await User.findById(id)
            .select("-password -otpCode -otpExpires")
        if (!user) {
            throw new Error("khong tim thay nguoi dung");
        }

        return user;
    },
    create: async (data) => {
        const {
            fullName,
            email,
            password,
            phone,
            avatar,
            address,
        } = data;
        if (!fullName || !email || !password) {
            throw new Error("vui long nhap day du thong tin ten, email, password")
        }
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            throw new Error("email da ton tai");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullName,
            email: normalizedEmail,
            password: hashedPassword,
            phone,
            avatar,
            address,
            role: "user",
            isVerified: false,
            isActive: true,
        })
        const userData = await User.findById(newUser._id).select(
            "-password -otpCode -otpExpires"
        );
        return userData;

    },
    update: async (id, data) => {
        const user = await User.findById(id);

        if (!user) {
            throw new Error("khong tim thay nguoi dung");
        }

        const {
            fullName,
            email,
            phone,
            avatar,
            address,
        } = data;

        const updateData = {};

        if (fullName !== undefined) updateData.fullName = fullName;
        if (phone !== undefined) updateData.phone = phone;
        if (avatar !== undefined) updateData.avatar = avatar;
        if (address !== undefined) updateData.address = address;

        if (email !== undefined) {
            const normalizedEmail = email.toLowerCase().trim();
            const existingUser = await User.findOne({
                email: normalizedEmail,
                _id: { $ne: id },
            });

            if (existingUser) {
                throw new Error("email da ton tai");
            }

            updateData.email = normalizedEmail;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password -otpCode -otpExpires");

        return updatedUser;
    },

}
module.exports = UserService;
