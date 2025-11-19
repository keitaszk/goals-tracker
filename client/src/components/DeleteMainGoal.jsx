import { useState } from 'react';
import {
    Stack,
    DialogTitle,
    Dialog,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledCloseIcon } from './ui/StyledCloseIcon';
import { PrimaryButton } from './ui/PrimaryButton';
import { TextButton } from './ui/TextButton';
import "./ui/Dialog.css"

export default function DeleteMainGoal({ mainGoal, updateMainGoals, handleMenuClose, }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleMenuClose();
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/mainGoals/${mainGoal._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })

        if (res.ok) {
            handleClose();
            updateMainGoals();
        } else {
            console.error("Error deleting main goal");
        }
    }
    return (
        <>
            <MenuItem onClick={(e) => {
                e.stopPropagation();
                handleClickOpen();
            }}>
                <ListItemIcon>
                    <DeleteIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Delete Main Goal" />
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                        {`Delete ${mainGoal ? mainGoal.title : ""}?`}
                    </DialogTitle>
                    <StyledCloseIcon
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                        }}
                    >
                    </StyledCloseIcon>
                </Stack>
                <form action="" onSubmit={handleDelete}>
                        <div className='buttons'>
                            <TextButton
                                variant="text"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClose();
                                }}
                            >
                                Cancel
                            </TextButton>
                            <PrimaryButton
                                type='submit'
                                variant="contained"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                Delete
                            </PrimaryButton>
                        </div>
                </form>
            </Dialog>
        </>
    )
}