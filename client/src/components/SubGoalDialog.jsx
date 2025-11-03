import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment } from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function SubGoalDialog({ selectedMainGoal }) {
    const mainGoalId = selectedMainGoal._id
    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState(dayjs());
    const [title, setTitle] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSubGoal = {
            title,
            dueDate: new Date(dueDate),
        };

        console.log("送信内容:", newSubGoal);
        const res = await fetch(`http://localhost:3000/api/mainGoals/${mainGoalId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSubGoal),
        })

        if (res.ok) {
            const data = await res.json();
            console.log("追加成功", data)
            handleClose();
        } else {
            console.log("追加失敗")
        }
    }

    return (
        <Fragment>
            <Button
                onClick={handleClickOpen}
                variant="text"
                sx={{
                    borderColor: "#a855f7",
                    color: "#a855f7",
                    backgroundColor: "transparent",
                    fontWeight: 600,
                }}
            >+ Add Subgoal</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <DialogTitle id="alert-dialog-title">
                        {"Add New Subgoal"}
                    </DialogTitle>
                    <CloseIcon sx={{ mr: 2 }} onClick={handleClose} />
                </Stack>
                <form action="" onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Controlled picker"
                                value={dueDate}
                                onChange={(newDate) => setDueDate(newDate)}
                            />
                        </LocalizationProvider>
                    </DialogContent>
                    <Button type='submit'>Create</Button>
                    <DialogActions>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
}
