import { styled } from "@mui/material";
import Button from "@mui/material/Button";

export const EmojiSelectorButton = styled(Button)(() => ({
    backgroundColor: "#eeeeeeff",
    color: "#000",
    textTransform: "none",      
    "&:hover": {
        backgroundColor: "#dcdcdcff", 
    },
    "&:active": {
        outline: "none"
    },
    "&:focus": {
        outline: "none"
    },
}))