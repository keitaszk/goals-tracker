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
              <StepLabel sx={{
                "& .MuiStepLabel-label": {
                  fontSize: "0.9rem",
                  color: dayjs(subGoal.dueDate).isAfter(dayjs(), "day")
                    ? "#666"
                    : subGoal.completed
                      ? "#666"
                      : "#FF0000",

                  marginTop: "10px",
                  textDecoration: subGoal.completed ? "line-through" : "",
                },
              }}>
                {dayjs(subGoal.dueDate).year() === dayjs().year()
                  ? dayjs(subGoal.dueDate).format("MM/DD")
                  : dayjs(subGoal.dueDate).format("YYYY/MM/DD")}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box >
  );
}