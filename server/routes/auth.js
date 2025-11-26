require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "Someone already has that username." });
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters and contain letters and numbers" });
        }

        const hashedPw = await bcrypt.hash(password, 12);

        const user = new User({
            username,
            password: hashedPw,
        });
        await user.save();

        return res.status(201).json({
            message: "User registered successfully.",
            userId: user._id
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Username does not exist." })
        }
        const validPw = await bcrypt.compare(password, user.password);
        if (!validPw) {
            return res.status(400).json({ message: "The password is incorrect." })
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        return res.json({
            message: "Login successful",
            token,
            username: user.username
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;