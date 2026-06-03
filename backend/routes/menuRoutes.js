const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const verifyToken = require("../middleware/authMiddleware");

// Hämta alla maträtter
router.get("/", async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Kunde inte hämta meny" });
    }
});

// Skapa ny maträtt
router.post("/", verifyToken, async (req, res) => {
    try {
        const menuItem = new MenuItem(req.body);
        const savedItem = await menuItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: "Kunde inte skapa maträtt" });
    }
});

// Uppdatera maträtt
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Maträtt hittades inte" });
        }

        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: "Kunde inte uppdatera maträtt" });
    }
});

// Radera maträtt
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Maträtt hittades inte" });
        }

        res.json({ message: "Maträtt raderad" });
    } catch (error) {
        res.status(400).json({ message: "Kunde inte radera maträtt" });
    }
});

module.exports = router;
