import { Box, Stepper, Step, StepLabel } from '@mui/material'
import dayjs from 'dayjs';

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
      <Stepper
        activeStep={completedCount}
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
        {subGoals.map((subGoal, idx) => {
          const daysLeft = dayjs(subGoal.dueDate).diff(dayjs(), "day")
          return (
            <Step key={idx}>
              <StepLabel>{daysLeft} days left</StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  );
}