const express = require("express");
const router = express.Router();
const db = require("../db/database");
const authMiddleware = require("../middleware/authMiddleware");

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
router.post("/", authMiddleware, (req, res) => {

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

// Radera en maträtt
router.delete("/:id", authMiddleware, (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM menu WHERE id = ?";

    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({
                message: "Fel vid radering av maträtt",
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                message: "Ingen maträtt hittades med detta id"
            });
        }

        res.json({
            message: "Maträtt raderad"
        });
    });
});

// Uppdatera en maträtt
router.put("/:id", authMiddleware, (req, res) => {
    const id = req.params.id;
    const { title, description, price, category, image } = req.body;

    if (!title || !description || !price || !category) {
        return res.status(400).json({
            message: "Alla obligatoriska fält måste fyllas i"
        });
    }

    const sql = `
        UPDATE menu
        SET title = ?, description = ?, price = ?, category = ?, image = ?
        WHERE id = ?
    `;

    db.run(sql, [title, description, price, category, image, id], function(err) {
        if (err) {
            return res.status(500).json({
                message: "Fel vid uppdatering av maträtt",
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                message: "Ingen maträtt hittades med detta id"
            });
        }

        res.json({
            message: "Maträtt uppdaterad"
        });
    });
});

module.exports = router;