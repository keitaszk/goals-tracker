import DeleteIcon from '@mui/icons-material/Delete'; import { useState } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { MenuItem, ListItemIcon, ListItemText, Stack, DialogTitle, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function DeleteSubgoal({ subGoal, selectedMainGoal, updateMainGoals, handleMenuClose }) {
    const mainGoalId = selectedMainGoal._id
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleMenuClose();
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/api/mainGoals/${mainGoalId}/${subGoal._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })

        if (res.ok) {
            const data = await res.json();
            console.log("subgoal消去成功", data)
            handleClose();
            updateMainGoals();
        } else {
            console.log("subgoal消去失敗")
        }
    }
    return (
        <>
            <MenuItem onClick={handleClickOpen}>
                <ListItemIcon>
                    <DeleteIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary="Delete Subgoal" />
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                        {"Delete subgoal?"}
                    </DialogTitle>
                    <CloseIcon sx={{ mr: 2 }} onClick={handleClose} />
                </Stack>
                <form action="" onSubmit={handleDelete}>
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
                            <Button
                                type='submit'
                                variant="contained"
                                sx={{
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
                                }}>Delete</Button>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}