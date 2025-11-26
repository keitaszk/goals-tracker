import { styled } from "@mui/material";
import Alert from "@mui/material/Alert";

export const StyledAlert = styled(Alert)(() => ({
    borderRadius: "8px",
    backgroundColor: "#8b5cf6",
    color: "white",
    fontWeight: 600,
    boxShadow: "0px 4px 20px rgba(0,0,0,0.15)"
}))