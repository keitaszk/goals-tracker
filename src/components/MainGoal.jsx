import GoalStepper from "./GoalStepper"
import SubGoalCard from "./SubGoalCard"
import { Box } from "@mui/material"

export default function MainGoal({ selectedMainGoal }) {
    const goal = selectedMainGoal
    return (
        <>
            <Box sx={{ flex: 1, p: 6, maxWidth: "800px", mx: "auto" }}>
                <h1>{goal.emoji} {goal.title}</h1>
                <GoalStepper goal={goal} />
                <p>{goal.dueDate} left</p>
                <SubGoalCard goal={goal} />
            </Box>
        </>
    )
}