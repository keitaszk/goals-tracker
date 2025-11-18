// cleaned

import Box from "@mui/material/Box"
import AddSubgoal from "./AddSubGoal"
import GoalStepper from "./GoalStepper"
import SubgoalCard from "./SubgoalCard"

export default function MainGoal({ selectedMainGoal, updateMainGoals }) {
    return (
        <>
            <h1>{selectedMainGoal.emoji} {selectedMainGoal.title}</h1>
            <GoalStepper selectedMainGoal={selectedMainGoal} />
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gap: 2,
                    textAlign: "left",
                    marginTop: "30px"
                }}
            >
                <SubgoalCard selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
                <AddSubgoal selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
            </Box>
        </>
    )
}