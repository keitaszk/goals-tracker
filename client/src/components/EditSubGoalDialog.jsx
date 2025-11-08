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
import EditIcon from '@mui/icons-material/Edit';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';

export default function EditSubGoalDialog({ selectedMainGoal, subGoal, updateMainGoals, handleMenuClose }) {
    const mainGoalId = selectedMainGoal._id
    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState(subGoal ? dayjs(subGoal.dueDate): null);
    const [title, setTitle] = useState(subGoal ? subGoal.title: null);

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
            updateMainGoals();
        } else {
            console.log("subGoal編集失敗")
        }
    }

    return (

        <Fragment>
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
                    <DialogActions>
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
                            }}>Save</Button>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
        </Fragment>
    );
}
