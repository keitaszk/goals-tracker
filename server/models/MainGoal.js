const mongoose = require("mongoose");

const subgoalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
})

const mainGoalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    emoji: { type: String },
    subGoals: [subgoalSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const MainGoal = mongoose.model("MainGoal", mainGoalSchema);

module.exports = MainGoal