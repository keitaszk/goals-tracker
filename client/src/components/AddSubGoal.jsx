import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment } from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Card, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

export default function AddSubgoal({ selectedMainGoal, updateMainGoals }) {
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
            updateMainGoals();
        } else {
            console.log("追加失敗")
        }
    }

    return (
        <Card>
            <CardActionArea
                onClick={handleClickOpen}
                sx={{
                    "&:focus": {
                        outline: "none"
                    },
                    "&:active": {
                        outline: "none"
                    },
                }}>
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "center", // centers horizontally
                        alignItems: "center",     // centers vertically
                    }}>
                    <Fragment>
                        <Typography
                            sx={{
                                color: "#a855f7",
                                fontWeight: 600,
                            }}>
                            + Add Subgoal
                        </Typography>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            onClick={(e) => e.stopPropagation()}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                                    {"New Subgoal"}
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
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
