const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Login-route
router.post("/login", (req, res) => {

    const { username, password } = req.body;

    // Enkel hårdkodad admin
    const adminUser = {
        username: "admin",
        password: "lösen123"
    };

    // Kontrollera användare
    if (
        username !== adminUser.username ||
        password !== adminUser.password
    ) {
        return res.status(401).json({
            message: "Fel användarnamn eller lösenord"
        });
    }

    // Skapa JWT-token
    const token = jwt.sign(
        { username: adminUser.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Inloggning lyckades",
        token
    });
});

module.exports = router;