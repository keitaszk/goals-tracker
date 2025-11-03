import DeleteIcon from '@mui/icons-material/Delete'; import { useState } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';

export default function DeleteMainGoal({ mainGoal, updateMainGoals }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/api/mainGoals/${mainGoal._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })

        if (res.ok) {
            const data = await res.json();
            console.log("消去成功", data)
            handleClose();
            updateMainGoals();
        } else {
            console.log("消去失敗")
        }
    }
    return (
        <>
            <DeleteIcon onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <h2>消去しますか？</h2>
                <form action="" onSubmit={handleDelete}>
                    <Button type='submit'>Delete</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </form>
            </Dialog>
        </>
    )
}