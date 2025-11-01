const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/goals')
    .then(() => console.log('Connected!'));

const subGoalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
})

const mainGoalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
    emoji: { type: String },
    themeColor: { type: String },
    subGoals: [subGoalSchema],
})

// create a class in the DB
// db.maingoals.find()
const MainGoal = mongoose.model("MainGoal", mainGoalSchema);

app.get("/api/mainGoals", async (req, res) => {
    try {
        const goals = await MainGoal.find();
        res.json(goals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" })
    }
})

app.post("/api/mainGoals", async (req, res) => {
    try {
        const newMainGoal = new MainGoal(req.body);
        await newMainGoal.save();
        res.status(201).json(newMainGoal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/api/mainGoals/:id", async (req, res) => {
    try {
        const mainGoalId = req.params.id;
        const subGoalData = req.body;

        const updateMainGoal = await MainGoal.findByIdAndUpdate(
            mainGoalId,
            { $push: { subGoals: subGoalData } },
            { new: true }
        );

        if (!updateMainGoal) {
            return res.status(404).json({ message: "MainGoal not found" });
        }
        res.json(updateMainGoal);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" })
    }
})

app.patch("/api/subgoals/:subGoalId", async (req, res) => {
    try {
        const subGoalId = req.params.subGoalId;
        const mainGoal = await MainGoal.findOne({ "subGoals._id": subGoalId });
        if (!mainGoal) return res.status(404).json({ message: "MainGoal not found" });

        const subGoal = mainGoal.subGoals.id(subGoalId)
        subGoal.completed = !subGoal.completed;

        await mainGoal.save();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})

app.put("/api/mainGoals/:id", async (req, res) => {
    try {
        const editedMainGoal = await MainGoal.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(editedMainGoal); // respond edited data to React
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

app.delete("/api/mainGoals/:id", async (req, res) => {
    try {
        const deletedMainGoal = await MainGoal.findByIdAndDelete(req.params.id);
        if (!deletedMainGoal) {
            return res.status(404).json({ message: "Main goal not found" });
        }
        res.json({ message: "Main goal deleted successfully", deletedMainGoal });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})

