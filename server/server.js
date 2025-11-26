const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const mainGoalsRoutes = require("./routes/mainGoals");
const subgoalsRoutes = require("./routes/subgoals");
const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/goals')
    .then(() => {
        console.log('Connected!');
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
