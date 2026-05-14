require("dotenv").config();
const express = require("express")
const connectDB = require("./configs/db")
const authRouter = require("./routers/auth.router")
const userRouter = require("./routers/user.router")
const categoryRouter = require("./routers/category.router")
const productRouter = require("./routers/product.router")
const cartRouter = require("./routers/cart.router")
const orderRouter = require("./routers/order.router")

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
    res.send("Hello")
})
// ket noi DB
connectDB();
app.listen(8080, () => {
    console.log("Server running on http://localhost:8080")
})
