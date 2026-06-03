const connectDB = require("./db/database");

const menuRoutes = require("./routes/menuRoutes");
const authRoutes = require("./routes/authRoutes");

const express = require("express");
const cors = require("cors");
require("dotenv").config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/menu", menuRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Backend API fungerar!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
});