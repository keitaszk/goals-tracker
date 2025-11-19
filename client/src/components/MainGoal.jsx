import Box from "@mui/material/Box"
import AddSubgoal from "./AddSubGoal"
import GoalStepper from "./GoalStepper"
import SubgoalCard from "./SubgoalCard"
import { Typography } from "@mui/material"

export default function MainGoal({ selectedMainGoal, updateMainGoals }) {
    return (
            <Box sx={{
                maxWidth: "600px",
            }}>
                <Typography
                    fontSize="50px"
                    fontWeight="600"
                >{selectedMainGoal.emoji} {selectedMainGoal.title}</Typography>
                <Box sx={{ overflowX: "auto" }}>
                    <GoalStepper selectedMainGoal={selectedMainGoal} />
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 2,
                        textAlign: "left",
                        marginTop: "30px"
                    }}
                >
                    <SubgoalCard selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
                    <AddSubgoal selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
                </Box>
            </Box>
    )
}