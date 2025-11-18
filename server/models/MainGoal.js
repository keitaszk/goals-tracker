const mongoose = require("mongoose");

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

const MainGoal = mongoose.model("MainGoal", mainGoalSchema);

module.exports = MainGoal