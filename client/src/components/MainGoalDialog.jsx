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

export default function SubGoalDialog() {
    const [open, setOpen] = useState(false);
    const [dueDate, setDate] = useState(dayjs());
    const [title, setTitle] = useState("");
    const [emoji, setEmoji] = useState("");
    const [themeColor, setThemeColor] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMainGoal = {
            title,
            dueDate: new Date(dueDate),
            emoji,
            themeColor
        };

        console.log("送信内容:", newMainGoal);
        const res = await fetch("http://localhost:3000/api/goals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMainGoal),
        })

        if (res.ok) {
            const data = await res.json();
            console.log("追加成功", data)
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
            >+ Add Maingoal</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <DialogTitle id="alert-dialog-title">
                        {"Add New Maingoal"}
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
                                onChange={(newDate) => setDate(newDate)}
                            />
                        </LocalizationProvider>
                        <TextField id="outlined-basic" label="Emoji" variant="outlined" value={emoji} onChange={(e) => setEmoji(e.target.value)} />
                        <TextField id="outlined-basic" label="Color" variant="outlined" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} />
                    </DialogContent>
                    <Button type='submit'>Create</Button>
                    <DialogActions>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
}
