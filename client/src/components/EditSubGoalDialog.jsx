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
import EditIcon from '@mui/icons-material/Edit';

export default function EditSubGoalDialog({ selectedMainGoal, subGoal }) {
    const mainGoalId = selectedMainGoal._id
    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState(dayjs(subGoal.dueDate));
    const [title, setTitle] = useState(subGoal.title);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedSubGoal = {
            title,
            dueDate: new Date(dueDate),
        };

        console.log("送信内容:", editedSubGoal);
        const res = await fetch(`http://localhost:3000/api/mainGoals/${mainGoalId}/${subGoal._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedSubGoal),
        })

        if (res.ok) {
            const data = await res.json();
            console.log("subGoal編集成功", data)
            handleClose();
        } else {
            console.log("subGoal編集失敗")
        }
    }

    return (
        <Fragment>
            <EditIcon onClick={handleClickOpen}/>
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
                    <Button type='submit'>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                    <DialogActions>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
}
