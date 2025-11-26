// cleaned

import { useState } from "react";
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContentText,
} from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { TextButton } from "../ui/TextButton";
import { PrimaryButton } from "../ui/PrimaryButton";
import "./Logout.css"

export default function Logout() {

    const [open, setOpen] = useState(false);

    const username = localStorage.getItem("username");

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        handleMenuClose();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.reload();
    };

    return (
        <>
            <Box className="logout-container">
                <Box className="logout-content">
                    <Box display="flex" gap={1}>
                        <AccountCircleIcon
                            color="action"
                            sx={{ position: "relative", top: "-2px" }}
                        ></AccountCircleIcon>
                        <Typography
                            variant="body2"
                            color="#555"
                        >
                            {username}
                        </Typography>
                    </Box>
                    <LogoutIcon
                        className="logout-icon"
                        fontSize="small"
                        color="action"
                        onClick={handleDialogOpen}
                        sx={{
                            "&:hover": {
                                color: "#a855f7",
                                transform: "scale(1.1)",
                            }
                        }}
                    ></LogoutIcon>
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        width: "275px",
                        textAlign: "center",
                    }
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                    className="dialog-title"
                >
                    Logging out
                </DialogTitle>
                <DialogContentText >
                    Are you sure?
                </DialogContentText>
                <Box className="logout-buttons">
                    <TextButton
                        variant="text"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDialogClose();
                        }}
                    >
                        Cancel
                    </TextButton>
                    <PrimaryButton
                        variant="contained"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLogout();
                        }}
                    >
                        Logout
                    </PrimaryButton>
                </Box>
            </Dialog>
        </>
    )
}