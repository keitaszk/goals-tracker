import { styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const StyledCloseIcon = styled(CloseIcon)(() => ({
    marginRight: 20,
    cursor: "pointer",
    transition: "0.2s",
    "&:hover": {
        color: "#555",
        transform: "scale(1.2)",
    },
    "&:active": {
        transform: "scale(0.95)",
        opacity: 0.8,
    },
}))