import { styled } from "@mui/material";
import Menu from "@mui/material/Menu";

export const ActionsMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: theme.shape.borderRadius * 1.5, 
        marginTop: theme.spacing(1),
        minWidth: 180,
        boxShadow: theme.shadows[2],
    }
}))