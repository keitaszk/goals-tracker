import { styled } from "@mui/material";
import Link from "@mui/material/Link";

export const StyledLink = styled(Link)(() => ({
    color: "#8b5cf6",
    fontWeight: 600,
    "&:hover": {
        color: "#9333ea",
    },
}))