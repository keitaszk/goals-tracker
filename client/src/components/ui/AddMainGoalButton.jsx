import { styled } from "@mui/material";
import Button from "@mui/material/Button";

export const AddMainGoalButton = styled(Button)(() => ({
    borderColor: "#a855f7",
    color: "#a855f7",
    backgroundColor: "transparent",
    fontWeight: 600,
    margin: "5px 0px",
    "&:hover": {
        backgroundColor: "rgba(168, 85, 247, 0.08)",
    },
    "&:active": {
        outline: "none"
    },
    "&:focus": { outline: "none" },
}))