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

export default function EditMainGoalDialog({ mainGoal }) {
    const [open, setOpen] = useState(false);
    const [dueDate, setDate] = useState(dayjs(mainGoal.dueDate));
    const [title, setTitle] = useState(mainGoal.title);
    const [emoji, setEmoji] = useState(mainGoal.emoji);
    const [themeColor, setThemeColor] = useState(mainGoal.themeColor);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        const editedMainGoal = {
            title,
            dueDate: new Date(dueDate),
            emoji,
            themeColor
        };

        console.log("送信内容:", editedMainGoal);
        const res = await fetch(`http://localhost:3000/api/mainGoals/${mainGoal._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedMainGoal),
        })

        if (res.ok) {
            const data = await res.json();
            console.log("編集成功", data)
            handleClose();
        } else {
            console.log("編集失敗")
        }
    }

    return (
        <Fragment>
            <EditIcon
                onClick={handleClickOpen}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <DialogTitle id="alert-dialog-title">
                        {"Add New Main Goal"}
                    </DialogTitle>
                    <CloseIcon sx={{ mr: 2 }} onClick={handleClose} />
                </Stack>
                <form action="" onSubmit={handleEdit}>
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
                    <Button type='submit'>Save</Button>
                    <DialogActions>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
}
