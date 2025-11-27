// cleaned

import { useState } from 'react';
import {
    MenuItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import { StyledCloseIcon } from '../ui/StyledCloseIcon';
import { TextButton } from '../ui/TextButton';
import { PrimaryButton } from '../ui/PrimaryButton';
import { BASE_URL } from "../../config";
import "../ui/Dialog.css"

export default function EditSubgoal({ selectedMainGoal, subGoal, updateMainGoals, handleMenuClose }) {

    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState(subGoal ? dayjs(subGoal.dueDate) : null);
    const [title, setTitle] = useState(subGoal ? subGoal.title : null);
    const [titleError, setTitleError] = useState(false);

    const mainGoalId = selectedMainGoal._id;
    const token = localStorage.getItem("token");

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        handleMenuClose();
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        if (title.trim() === "") {
            setTitleError(true);
            return;
        }

        const editedSubGoal = {
            title,
            dueDate: new Date(dueDate),
            completed: subGoal.completed
        };

        const res = await fetch(`${BASE_URL}/mainGoals/${mainGoalId}/subgoals/${subGoal._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(editedSubGoal),
        })

        if (res.ok) {
            handleDialogClose();
            updateMainGoals();
        } else {
            console.error("Error editing subgoal", res.status)
        }
    }

    return (
        <>
            <MenuItem onClick={handleDialogOpen}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit Subgoal" />
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                        {"Edit Subgoal"}
                    </DialogTitle>
                    <StyledCloseIcon onClick={handleDialogClose}></StyledCloseIcon>
                </Stack>
                <form action="" onSubmit={handleEdit}>
                    <DialogContent>
                        <div className='text-box'>
                            <h3>Title:</h3>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={title}
                                error={titleError}
                                helperText={titleError ? "Title is required" : ""}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='text-box'>
                            <h3>Due date:</h3>
                            <DatePicker
                                value={dueDate}
                                onChange={(newDate) => setDueDate(newDate)}
                            />
                        </div>
                    </DialogContent>
                    <div className='buttons'>
                        <TextButton
                            variant="text"
                            onClick={handleDialogClose}
                        >
                            Cancel
                        </TextButton>
                        <PrimaryButton
                            type='submit'
                            variant="contained">
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Dialog>
        </>
    );
}
