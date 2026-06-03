const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("MenuItem", menuItemSchema);