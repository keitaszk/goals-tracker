import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
    const [date, setDate] = useState(dayjs());
    const [title, setTitle] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                <DialogContent>
                    <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={() => setTitle()}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Controlled picker"
                            value={date}
                            onChange={(newDate) => setDate(newDate)}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
