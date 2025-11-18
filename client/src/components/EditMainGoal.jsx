// cleaned

import { useRef, useState, useEffect } from 'react';
import {
    Stack,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Popover,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import { StyledCloseIcon } from './ui/StyledCloseIcon';
import { EmojiSelectorButton } from './ui/EmojiSelectorButton';
import { PrimaryButton } from './ui/PrimaryButton';
import { TextButton } from './ui/TextButton';
import "./ui/Dialog.css"

export default function EditMainGoal({ mainGoal, updateMainGoals, handleMenuClose }) {

    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState(mainGoal ? dayjs(mainGoal.dueDate) : null);
    const [title, setTitle] = useState(mainGoal ? mainGoal.title : null);
    const [emoji, setEmoji] = useState(mainGoal ? mainGoal.emoji : null);
    const [anchorEl, setAnchorEl] = useState(null);

    const pickerRef = useRef(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleMenuClose();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAnchorClose = () => {
        setAnchorEl(null);
    }

    const openEmoji = Boolean(anchorEl);

    const handleEdit = async (e) => {
        e.preventDefault();
        const editedMainGoal = {
            title,
            dueDate: new Date(dueDate),
            emoji,
        };
        const res = await fetch(`http://localhost:3000/mainGoals/${mainGoal._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedMainGoal),
        })

        if (res.ok) {
            const data = await res.json();
            handleClose();
            updateMainGoals();
        } else {
            console.error("Error editing main goal")
        }
    }

    // Listen for the emoji picker's custom "emoji-click" event
    useEffect(() => {
        const picker = pickerRef.current;
        if (!picker) return;

        const handleEmojiClick = (event) => {
            const selectedEmoji = event.detail.unicode;
            setEmoji(selectedEmoji);
            setAnchorEl(null);
        };

        picker.addEventListener("emoji-click", handleEmojiClick);

        return () => {
            picker.removeEventListener("emoji-click", handleEmojiClick);
        };
    }, [openEmoji]);

    return (
        <>
            <MenuItem
                onClick={(e) => {
                    e.stopPropagation();
                    handleClickOpen();
                }}
            >
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit Main Goal" />
            </MenuItem>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                            {"Edit Main Goal"}
                        </DialogTitle>
                        <StyledCloseIcon
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClose();
                            }}
                        >
                        </StyledCloseIcon>
                    </Stack>
                    <form action="" onSubmit={handleEdit}>
                        <DialogContent>
                            <div className="text-box" >
                                <h3>Title:</h3>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="text-box">
                                <h3>Due date:</h3>
                                <DatePicker
                                    value={dueDate}
                                    onChange={(newDate) => setDueDate(newDate)}
                                />
                            </div>
                            <div className='icon-selector'>
                                <h3>Icon:</h3>
                                <span className='emoji'>{emoji}</span>
                                <EmojiSelectorButton
                                    onClick={handleClick}
                                    variant="contained"
                                >
                                    Select Icon
                                </EmojiSelectorButton>
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
                        <div className='buttons'>
                            <TextButton
                                variant="text"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClose();
                                }}>
                                Cancel
                            </TextButton>
                            <PrimaryButton
                                type='submit'
                                variant="contained"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                </Dialog>
        </>
    );
}
