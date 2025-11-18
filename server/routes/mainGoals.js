const express = require("express");
const router = express.Router();
const MainGoal = require("../models/MainGoal");

// fetch mainGoals
router.get("/", async (req, res) => {
    try {
        const mainGoals = await MainGoal.find();
        res.json(mainGoals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" })
    }
});

//add new main goal
router.post("/", async (req, res) => {
    try {
        const newMainGoal = new MainGoal(req.body);
        await newMainGoal.save();
        res.status(201).json(newMainGoal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// update maingoal
router.put("/:mainGoalId", async (req, res) => {
    try {
        const editedMainGoal = await MainGoal.findByIdAndUpdate(req.params.mainGoalId, req.body, {
            new: true,
        });
        res.json(editedMainGoal); // respond edited data to React
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// delete maingoal
router.delete("/:mainGoalId", async (req, res) => {
    try {
        const deletedMainGoal = await MainGoal.findByIdAndDelete(req.params.mainGoalId);
        if (!deletedMainGoal) {
            return res.status(404).json({ message: "Main goal not found" });
        }
        res.json({ message: "Main goal deleted successfully", deletedMainGoal });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;