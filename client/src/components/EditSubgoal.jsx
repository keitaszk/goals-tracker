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
import { StyledCloseIcon } from './ui/StyledCloseIcon';
import "./Dialog.css"
import { TextButton } from './ui/TextButton';
import { PrimaryButton } from './ui/PrimaryButton';

export default function EditSubgoal({ selectedMainGoal, subGoal, updateMainGoals, handleMenuClose }) {

    const mainGoalId = selectedMainGoal._id;

    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState(subGoal ? dayjs(subGoal.dueDate) : null);
    const [title, setTitle] = useState(subGoal ? subGoal.title : null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleMenuClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedSubGoal = {
            title,
            dueDate: new Date(dueDate),
        };

        const res = await fetch(`http://localhost:3000/api/mainGoals/${mainGoalId}/${subGoal._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedSubGoal),
        })

        if (res.ok) {
            handleClose();
            updateMainGoals();
        } else {
            console.error("Error editing subgoal", res.status)
        }
    }

    return (
        <>
            <MenuItem onClick={handleClickOpen}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit Subgoal" />
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                        {"Edit Subgoal"}
                    </DialogTitle>
                    <StyledCloseIcon onClick={handleClose}></StyledCloseIcon>
                </Stack>
                <form action="" onSubmit={handleSubmit}>
                    <DialogContent>
                        <div className='text-box'>
                            <h3>Title:</h3>
                            <TextField id="outlined-basic" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                            onClick={handleClose}
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
