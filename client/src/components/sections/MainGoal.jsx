// cleaned

import {
    Typography,
    Box
} from "@mui/material"
import AddSubgoal from "../subgoalActions/AddSubgoal"
import GoalStepper from "./GoalStepper"
import SubgoalCard from "./SubgoalCard"
import dayjs from "dayjs"
import "./MainGoal.css"

export default function MainGoal({ selectedMainGoal, updateMainGoals }) {
    return (
        <Box
            className="main-goal-container"
        >
            <Typography
                fontSize="50px"
                fontWeight="600"
            >
                {selectedMainGoal.emoji} {selectedMainGoal.title}
            </Typography>
            <Typography className="main-goal-duedate">
                Due: {dayjs(selectedMainGoal.dueDate).format("MMM D, YYYY")}
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
                <GoalStepper selectedMainGoal={selectedMainGoal} />
            </Box>
            <Box className="subgoal-container">
                <SubgoalCard selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
                <AddSubgoal selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
            </Box>
        </Box>
    )
}