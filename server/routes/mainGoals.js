const express = require("express");
const router = express.Router();
const MainGoal = require("../models/MainGoal");
const auth = require("../middleware/auth");

// fetch mainGoals
router.get("/", auth, async (req, res) => {
    try {
        const mainGoals = await MainGoal.find({ userId: req.user.id });
        res.json(mainGoals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" })
    }
});

//add new main goal
router.post("/", auth, async (req, res) => {
    try {
        const { title, dueDate, emoji } = req.body;
        const newMainGoal = new MainGoal({
            title,
            dueDate,
            emoji,
            subGoals: [],
            userId: req.user.id // from auth middleware
        });
        await newMainGoal.save();
        res.status(201).json(newMainGoal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// update maingoal
router.put("/:mainGoalId", auth, async (req, res) => {
    try {
        const editedMainGoal = await MainGoal.findByIdAndUpdate(req.params.mainGoalId, req.body, {
            new: true,
        });
        res.json(editedMainGoal); 
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// delete maingoal
router.delete("/:mainGoalId", auth, async (req, res) => {
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