// cleaned

import { useState } from 'react';
import {
    MenuItem,
    ListItemIcon,
    ListItemText,
    Stack,
    DialogTitle,
    Dialog
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledCloseIcon } from '../ui/StyledCloseIcon';
import { TextButton } from '../ui/TextButton';
import { PrimaryButton } from '../ui/PrimaryButton';
import "../ui/Dialog.css"

export default function DeleteSubgoal({ subGoal, selectedMainGoal, updateMainGoals, handleMenuClose }) {

    const [open, setOpen] = useState(false);

    const mainGoalId = selectedMainGoal._id;
    const token = localStorage.getItem("token");


    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        handleMenuClose();
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/mainGoals/${mainGoalId}/subgoals/${subGoal._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })

        if (res.ok) {
            handleDialogClose();
            updateMainGoals();
        } else {
            console.error("Error deleting subgoal", res.status)
        }
    }
    return (
        <>
            <MenuItem onClick={handleDialogOpen}>
                <ListItemIcon>
                    <DeleteIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Delete Subgoal" />
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                        {`Delete ${subGoal ? subGoal.title : ""}?`}
                    </DialogTitle>
                    <StyledCloseIcon
                        sx={{ mr: 2 }}
                        onClick={handleDialogClose}
                    ></StyledCloseIcon>
                </Stack>
                <form action="" onSubmit={handleDelete}>
                    <div className='buttons'>
                        <TextButton
                            variant="text"
                            onClick={handleDialogClose}
                        >
                            Cancel
                        </TextButton>
                        <PrimaryButton
                            type='submit'
                            variant="contained"
                        >
                            Delete
                        </PrimaryButton>
                    </div>
                </form>
            </Dialog>
        </>
    )
}