// cleaned

import {
  Step,
  StepLabel
} from '@mui/material'
import dayjs from 'dayjs';
import { StyledStepper } from './ui/StyledStepper';

export default function GoalStepper({ selectedMainGoal }) {

  const subGoals = selectedMainGoal.subGoals
  let completedCount = 0

  // Count consecutive completed subgoals from the start.
  for (let subGoal of subGoals) {
    if (subGoal.completed) {
      completedCount++;
    } else {
      break;
    }
  }

  return (
      <StyledStepper
        activeStep={completedCount}
        alternativeLabel>
        {subGoals.map((subGoal, idx) => {
          return (
            <Step key={idx}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "0.9rem",
                    marginTop: "10px",
                    textDecoration: subGoal.completed ? "line-through" : "",
                    color: dayjs(subGoal.dueDate).isAfter(dayjs(), "day")
                      ? "#666"
                      : subGoal.completed
                        ? "#666"
                        : "#FF0000",
                  },
                }}>
                {dayjs(subGoal.dueDate).year() === dayjs().year()
                  ? dayjs(subGoal.dueDate).format("MM/DD")
                  : dayjs(subGoal.dueDate).format("YYYY/MM/DD")}
              </StepLabel>
            </Step>
          )
        })}
      </StyledStepper>
  );
}