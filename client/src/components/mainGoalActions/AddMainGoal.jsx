// cleaned

import {
    useEffect,
    useState,
    useRef
} from 'react';
import {
    Stack,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Popover,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'emoji-picker-element';
import { AddMainGoalButton } from '../ui/AddMainGoalButton';
import { StyledCloseIcon } from '../ui/StyledCloseIcon';
import { EmojiSelectorButton } from '../ui/EmojiSelectorButton';
import { TextButton } from '../ui/TextButton';
import { PrimaryButton } from '../ui/PrimaryButton';
import "../ui/Dialog.css"

export default function AddMainGoal({ updateMainGoals }) {

    const [open, setOpen] = useState(false);
    const [dueDate, setDueDate] = useState(dayjs());
    const [title, setTitle] = useState("");
    const [emoji, setEmoji] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    const pickerRef = useRef(null);

    const token = localStorage.getItem("token");
    const openEmoji = Boolean(anchorEl);

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

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setDueDate(dayjs());
        setTitle("");
        setEmoji("");
    };

    const handleEmojiOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEmojiClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMainGoal = {
            title,
            dueDate: new Date(dueDate),
            emoji,
        };

        const res = await fetch("http://localhost:3000/mainGoals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newMainGoal),
        })

        if (res.ok) {
            handleDialogClose();
            updateMainGoals();
        } else {
            console.error("Request failed with status", res.status)
        }
    };

    return (
        <>
            <AddMainGoalButton
                onClick={handleDialogOpen}
                variant="text"
            >
                + Add main goal
            </AddMainGoalButton>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                        {"New Main Goal"}
                    </DialogTitle>
                    <StyledCloseIcon onClick={handleDialogClose}>
                    </StyledCloseIcon>
                </Stack>
                <form action="" onSubmit={handleSubmit}>
                    <DialogContent>
                        <div className='text-box'>
                            <h3>Title:</h3>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='text-box'>
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
                                onClick={handleEmojiOpen}
                                variant="contained"
                            >
                                Select Icon
                            </EmojiSelectorButton>
                            <Popover
                                open={openEmoji}
                                anchorEl={anchorEl}
                                onClose={handleEmojiClose}
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
                            onClick={handleDialogClose}
                        >
                            Cancel
                        </TextButton>
                        <PrimaryButton
                            type='submit'
                            variant="contained"
                        >
                            Create
                        </PrimaryButton>
                    </div>
                </form>
            </Dialog>
        </>
    );
}
