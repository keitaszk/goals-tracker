import { Box, Stepper, Step, StepLabel } from '@mui/material'

export default function GoalStepper({ goal }) {

  const subGoals = goal.subGoals
  let completedCount = 0

  for (let subGoal of subGoals) {
    if (subGoal.completed) {
      completedCount++;
    } else {
      break;
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper a
        ctiveStep={completedCount}
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root": {
            color: "#d8b4fe", // ← デフォルト色（未完了）
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#a855f7", // ← 現在のステップ（アクティブ）
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "#9333ea", // ← 完了したステップ
          },
        }}>
        {subGoals.map((subGoal) => (
          <Step>
            <StepLabel>{subGoal.dueDate}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}