import { styled } from "@mui/material";
import Button from "@mui/material/Button";

export const PrimaryButton = styled(Button)(() => ({
    backgroundColor: "#a855f7",
    color: "white",
    textTransform: "none",
    fontWeight: 600,
    "&:hover": {
        backgroundColor: "#9333ea",
    },
    "&:active": {
        outline: "none"
    },
    "&:focus": {
        outline: "none"
    },
}))