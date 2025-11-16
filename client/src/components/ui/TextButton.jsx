import { styled } from "@mui/material";
import Button from "@mui/material/Button";

export const TextButton = styled(Button)(() => ({
    color: "#555", 
    textTransform: "none",
    fontWeight: 500,
    marginRight: "5px",
    "&:hover": {
        backgroundColor: "rgba(0,0,0,0.04)", 
    },
    "&:active": {
        backgroundColor: "rgba(0,0,0,0.08)", 
        outline: "none"
    },
}))