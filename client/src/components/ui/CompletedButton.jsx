import { styled } from "@mui/material";
import Button from "@mui/material/Button";

export const CompletedButton = styled(Button)(() => ({
    borderColor: "#A76DF3",
    color: "#A76DF3",
    fontWeight: 600,
    "&:hover": {
        borderColor: "#9333ea",
    },
    "&:active": {
        outline: "none"
    },
    "&:focus": { outline: "none" },
}))