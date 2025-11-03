import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'emoji-picker-element';
import { useRef } from 'react';
import Popover from '@mui/material/Popover';

export default function MainGoalDialog() {
    const [open, setOpen] = useState(false);
    const [dueDate, setDate] = useState(dayjs());
    const [title, setTitle] = useState("");
    const [emoji, setEmoji] = useState("");
    const [themeColor, setThemeColor] = useState("");
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const pickerRef = useRef(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAnchorClose = () => {
        setAnchorEl(null);
    }

    const openEmoji = Boolean(anchorEl);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMainGoal = {
            title,
            dueDate: new Date(dueDate),
            emoji,
            themeColor
        };

        console.log("送信内容:", newMainGoal);
        const res = await fetch("http://localhost:3000/api/mainGoals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMainGoal),
        })

        if (res.ok) {
            const data = await res.json();
            console.log("追加成功", data)
            handleClose();
        } else {
            console.log("追加失敗")
        }
    }

    useEffect(() => {
        const picker = pickerRef.current;
        if (!picker) return;

        const handleEmojiClick = (event) => {
            const selectedEmoji = event.detail.unicode;
            setEmoji(selectedEmoji); // 絵文字を保存
            setPickerVisible(false); // ピッカーを閉じる
            setAnchorEl(null);
        };

        picker.addEventListener("emoji-click", handleEmojiClick);

        return () => {
            picker.removeEventListener("emoji-click", handleEmojiClick);
        };
    }, [openEmoji]); // ピッカーが開いたときにリスナーを登録

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
            >+ Add maingoal</Button>
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
                <form action="" onSubmit={handleSubmit}>
                    <DialogContent>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <h3>Title:</h3>
                            <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <h3>Due date:</h3>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Controlled picker"
                                    value={dueDate}
                                    onChange={(newDate) => setDate(newDate)}
                                />
                            </LocalizationProvider>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <h3>Icon:</h3>
                            <span style={{ fontSize: "24px", marginLeft: "8px" }}>{emoji}</span>
                            {/* <Button onClick={() => setPickerVisible(!isPickerVisible)}>{isPickerVisible ? "Close picker" : "Open picker"}</Button>
                            {isPickerVisible && (

                                <emoji-picker ref={pickerRef}></emoji-picker>
                            )} */}

                            <Button onClick={handleClick}>{isPickerVisible ? "Close picker" : "Open picker"}</Button>
                            <Popover
                                open={openEmoji}
                                anchorEl={anchorEl}
                                onClose={handleAnchorClose}
                                disablePortal
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <emoji-picker ref={pickerRef}></emoji-picker>
                            </Popover>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <h3>Color:</h3>
                            <TextField id="outlined-basic" label="Color" variant="outlined" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} />
                        </div>
                    </DialogContent>
                    <Button type='submit'>Create</Button>
                    <DialogActions>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
}
