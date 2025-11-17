import { styled } from "@mui/material";
import Stepper from '@mui/material/Stepper';

export const StyledStepper = styled(Stepper)(() => ({
    "& .MuiStepIcon-root": {
        color: "#d8b4fe",
    },
    "& .MuiStepIcon-root.Mui-active": {
        color: "#a855f7",
    },
    "& .MuiStepIcon-root.Mui-completed": {
        color: "#9333ea",
    },
}))
