import AddSubgoal from "./AddSubgoal"
import GoalStepper from "./GoalStepper"
import SubgoalCard from "./SubgoalCard"
import { Box } from "@mui/material"

export default function MainGoal({ selectedMainGoal, updateMainGoals }) {
    return (
        <>
            <Box sx={{ flex: 1, p: 6, mx: "auto" }}>
                <h1>{selectedMainGoal.emoji} {selectedMainGoal.title}</h1>
                <GoalStepper goal={selectedMainGoal} />
                <Box
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gap: 2,
                        textAlign: "left",
                        marginTop: "30px"
                    }}
                >
                    <SubgoalCard selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals}/>
                    <AddSubgoal selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
                </Box>
            </Box>
        </>
    )
}