import { styled } from "@mui/material";
import Button from "@mui/material/Button";

export const AuthButton = styled(Button)(() => ({
    background: "linear-gradient(to right, #8b5cf6, #9333ea)",
    padding: "11px",
    fontSize: "1rem",
    borderRadius: "8px",
    fontWeight: 600,
    marginTop: "8px",
    "&:hover": {
        background: "linear-gradient(to right, #7c3aed, #8b5cf6)",
    },
}))