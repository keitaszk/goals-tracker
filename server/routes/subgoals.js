const express = require("express");
const router = express.Router({ mergeParams: true });
const MainGoal = require("../models/MainGoal");
const auth = require("../middleware/auth");

// add new subgoal
router.post("/", auth, async (req, res) => {
    try {
        const mainGoalId = req.params.mainGoalId;
        const subGoalData = req.body;

        const mainGoal = await MainGoal.findById(mainGoalId);
        if (!mainGoal) return res.status(404).json({ message: "MainGoal not found" });

        mainGoal.subGoals.push(subGoalData);

        // sort subgoals in ascending order by due date
        mainGoal.subGoals.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        })

        await mainGoal.save();
        res.json(mainGoal);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" })
    }
});

// update subgoal
router.put("/:subgoalId", auth, async (req, res) => {
    try {
        const { mainGoalId, subgoalId, completed } = req.params;
        const { title, dueDate } = req.body
        const mainGoal = await MainGoal.findById(mainGoalId);
        if (!mainGoal) {
            return res.status(404).json({ message: "Main goal not found" });
        }
        const subGoal = mainGoal.subGoals.id(subgoalId);
        if (!subGoal) {
            return res.status(404).json({ message: "Subgoal not found" });
        }
        subGoal.title = title;
        subGoal.dueDate = dueDate;
        subGoal.completed = completed;

        // sort subgoals in ascending order by due date
        mainGoal.subGoals.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        })

        await mainGoal.save();
        res.json(subGoal);
    } catch (err) {
        console.error("Error updating subgoal", err);
        res.status(500).json({ message: "Server error" });
    }
});

// toggle a subgoal’s completion status
router.patch("/:subgoalId", auth, async (req, res) => {
    try {
        const { mainGoalId, subgoalId } = req.params;
        const mainGoal = await MainGoal.findById(mainGoalId);
        if (!mainGoal) return res.status(404).json({ message: "MainGoal not found" });

        const subGoal = mainGoal.subGoals.id(subgoalId)
        subGoal.completed = !subGoal.completed;
        await mainGoal.save();
        res.json(mainGoal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// delete subgoal
router.delete("/:subgoalId", auth, async (req, res) => {
    try {
        const { mainGoalId, subgoalId } = req.params;
        const mainGoal = await MainGoal.findById(mainGoalId);
        if (!mainGoal) {
            return res.status(404).json({ message: "Main goal not found" });
        }
        const subGoal = mainGoal.subGoals.id(subgoalId);
        if (!subGoal) {
            return res.status(404).json({ message: "Subgoal not found" });
        }
        subGoal.deleteOne();
        await mainGoal.save();
        res.json({ message: "Subgoal deleted successfully" });
    } catch (err) {
        console.error("Error deleting subgoal:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;