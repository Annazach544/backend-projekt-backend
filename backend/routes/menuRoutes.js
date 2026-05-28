const express = require("express");
const router = express.Router();
const db = require("../db/database");

// Hämta alla maträtter från databasen
router.get("/", (req, res) => {
    const sql = "SELECT * FROM menu";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: "Något gick fel vid hämtning av meny",
                error: err.message
            });
        }

        res.json(rows);
    });
});

// Lägg till ny maträtt
router.post("/", (req, res) => {

    const { title, description, price, category, image } = req.body;

    if (!title || !description || !price || !category) {
        return res.status(400).json({
            message: "Alla obligatoriska fält måste fyllas i"
        });
    }

    const sql = `
        INSERT INTO menu(title, description, price, category, image)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [title, description, price, category, image],
        function(err) {

            if (err) {
                return res.status(500).json({
                    message: "Fel vid lagring av maträtt",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Maträtt skapad",
                id: this.lastID
            });
        }
    );
});

module.exports = router;