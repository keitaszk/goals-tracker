// cleaned

import { useState } from 'react';
import {
    Card,
    Stack,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    CardActionArea,
    CardContent
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { StyledCloseIcon } from '../ui/StyledCloseIcon';
import { TextButton } from '../ui/TextButton';
import { PrimaryButton } from '../ui/PrimaryButton';
import "./AddSubgoal.css"
import "../ui/Dialog.css"

export default function AddSubgoal({ selectedMainGoal, updateMainGoals }) {

    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState(dayjs());
    const [title, setTitle] = useState("");

    const mainGoalId = selectedMainGoal._id
    const token = localStorage.getItem("token");

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setDueDate(dayjs());
        setTitle("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSubGoal = {
            title,
            dueDate: new Date(dueDate),
        };

        const res = await fetch(`http://localhost:3000/mainGoals/${mainGoalId}/subgoals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newSubGoal),
        })

        if (res.ok) {
            const data = await res.json();
            handleDialogClose();
            updateMainGoals();
        } else {
            console.error("Error adding subgoal", res.status)
        }
    }

    return (
        <Card>
            <CardActionArea
                onClick={handleDialogOpen}
                className='no-outline'
            >
                <CardContent className='center-content'>
                    <Typography className='primary-content'>
                        + Add Subgoal
                    </Typography>
                    <Dialog
                        open={open}
                        onClose={handleDialogClose}
                        onClick={(e) => e.stopPropagation()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                                {"New Subgoal"}
                            </DialogTitle>
                            <StyledCloseIcon onClick={handleDialogClose}></StyledCloseIcon>
                        </Stack>
                        <form action="" onSubmit={handleSubmit}>
                            <DialogContent>
                                <div className='text-box'>
                                    <h3>Title:</h3>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
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
                                    variant="contained"
                                >
                                    Create
                                </PrimaryButton>
                            </div>
                        </form>
                    </Dialog>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
