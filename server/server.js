require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dbUrl = process.env.MONGODB_URL;

const mainGoalsRoutes = require("./routes/mainGoals");
const subgoalsRoutes = require("./routes/subgoals");
const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());

// 'mongodb://127.0.0.1:27017/goals'

mongoose.connect('mongodb://127.0.0.1:27017/goals')
    .then(() => {
        console.log('MongoDB Connected!');
    })
    .catch((err) => {
        console.error("Connection failed:", err);
    });

app.use("/mainGoals", mainGoalsRoutes);
app.use("/mainGoals/:mainGoalId/subgoals", subgoalsRoutes);
app.use("/auth", authRoutes)

app.listen(3000, () => {
    console.log("Server running on port 3000")
});
