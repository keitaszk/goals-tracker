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

        const mainGoal = await MainGoal.findById(mainGoalId);
        if (!mainGoal) return res.status(404).json({ message: "MainGoal not found" });

        mainGoal.subGoals.push(subGoalData);

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
})

app.patch("/api/subgoals/:subGoalId", async (req, res) => {
    try {
        const subGoalId = req.params.subGoalId;
        const mainGoal = await MainGoal.findOne({ "subGoals._id": subGoalId });
        if (!mainGoal) return res.status(404).json({ message: "MainGoal not found" });

        const subGoal = mainGoal.subGoals.id(subGoalId)
        subGoal.completed = !subGoal.completed;
        await mainGoal.save();
        res.json(mainGoal);
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

app.patch("/api/mainGoals/:mainGoalId/:subGoalId", async (req, res) => {
    try {
        const { mainGoalId, subGoalId } = req.params;
        const { title, dueDate, completed } = req.body
        const mainGoal = await MainGoal.findById(mainGoalId);
        if (!mainGoal) {
            return res.status(404).json({ message: "Main goal not found" });
        }
        const subGoal = mainGoal.subGoals.id(subGoalId);
        if (!subGoal) {
            return res.status(404).json({ message: "Subgoal not found" });
        }
        subGoal.title = title;
        subGoal.dueDate = dueDate;
        subGoal.completed = completed;

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

app.delete("/api/mainGoals/:mainGoalId/:subGoalId", async (req, res) => {
    try {
        const { mainGoalId, subGoalId } = req.params;
        const mainGoal = await MainGoal.findById(mainGoalId);
        if (!mainGoal) {
            return res.status(404).json({ message: "Main goal not found" });
        }
        const subGoal = mainGoal.subGoals.id(subGoalId);
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
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})

