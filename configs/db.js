const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        })
        console.log(`✅ MongoDB connected: ${con.connection.host}`);
    }
    catch (error) {
        console.error("❌ MongoDB error:", error.message);
        process.exit(1);
    }
}
module.exports = connectDB;