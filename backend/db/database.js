const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Ansluten till MongoDB");
    } catch (error) {
        console.error("Kunde inte ansluta till MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;