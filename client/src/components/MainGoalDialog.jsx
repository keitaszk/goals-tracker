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
import 'emoji-picker-element';
import { useRef } from 'react';
import Popover from '@mui/material/Popover';

export default function MainGoalDialog({ updateMainGoals }) {
    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState(dayjs());
    const [title, setTitle] = useState("");
    const [emoji, setEmoji] = useState("");
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
            updateMainGoals();
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
                    <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                        {"New Main Goal"}
                    </DialogTitle>
                    <CloseIcon sx={{ mr: 2 }} onClick={handleClose} />
                </Stack>
                <form action="" onSubmit={handleSubmit}>
                    <DialogContent>
                        <div style={{ display: "grid", alignItems: "center", gap: "12px", gridTemplateColumns: "100px 1fr" }}>
                            <h3>Title:</h3>
                            <TextField id="outlined-basic" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div style={{ display: "grid", alignItems: "center", gap: "12px", gridTemplateColumns: "100px 1fr" }}>
                            <h3>Due date:</h3>
                            <DatePicker
                                value={dueDate}
                                onChange={(newDate) => setDueDate(newDate)}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", }}>
                            <h3>Icon:</h3>
                            <span style={{ fontSize: "24px", marginLeft: "8px" }}>{emoji}</span>

                            <Button
                                onClick={handleClick}
                                variant="contained"
                                sx={{
                                    backgroundColor: "#eeeeeeff",
                                    color: "#000",
                                    textTransform: "none",      // ← ボタン内の文字をそのまま表示
                                    "&:hover": {
                                        backgroundColor: "#dcdcdcff", // ← 少し濃くしてホバー効果
                                    },
                                    "&:active": {
                                        outline: "none"
                                    },
                                    "&:focus": { outline: "none" },
                                }}>Select Icon</Button>
                            <Popover
                                open={openEmoji}
                                anchorEl={anchorEl}
                                onClose={handleAnchorClose}
                                disablePortal
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={{ transform: "translate(150px, -250px)" }}
                            >
                                <emoji-picker ref={pickerRef}></emoji-picker>
                            </Popover>
                        </div>
                    </DialogContent>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "20px" }}>
                        <Button
                            variant="text"
                            onClick={handleClose}
                            sx={{
                                color: "#555", // 通常時の文字色
                                textTransform: "none",
                                fontWeight: 500,
                                marginRight: "5px",
                                "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.04)", // ← 薄いグレー背景
                                },
                                "&:active": {
                                    backgroundColor: "rgba(0,0,0,0.08)", // ← クリック時に少し濃く
                                    outline: "none"
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' variant="contained" sx={{
                            backgroundColor: "#a855f7", // ← 紫（Tailwindのpurple-500）
                            color: "white",
                            textTransform: "none", // ← テキストをそのまま表示
                            fontWeight: 600,
                            "&:hover": {
                                backgroundColor: "#9333ea", // ← 少し濃い紫
                            },
                            "&:active": {
                                outline: "none"
                            },
                            "&:focus": { outline: "none" },
                        }}>Create</Button>
                    </div>
                    <DialogActions>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
}
