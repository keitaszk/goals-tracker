import { ListSubheader, Drawer, List, ListItemButton, ListItem, ListItemIcon, ListItemText, } from '@mui/material';
import MainGoalDialog from './MainGoalDialog';
import EditMainGoalDialog from './EditMainGoalDialog';
import DeleteMainGoal from './DeleteMainGoal';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';

export default function MenuDrawer({ mainGoals, handleSelectedGoal, updateMainGoals }) {


    const [anchorEl, setAnchorEl] = useState(null);
    const openEmoji = Boolean(anchorEl);
    const handleAnchorClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <div>
            <Drawer
                variant='permanent'
                sx={{
                    width: "250px", '& .MuiDrawer-paper': {
                        width: "250px",
                        boxSizing: 'border-box',
                        backgroundColor: "#f3e8ff",
                    },
                }}>
                <List
                    subheader={
                        <ListSubheader component="div" sx={{ textAlign: "left", backgroundColor: "#f3e8ff" }}>
                            Main Goals
                        </ListSubheader>
                    }>
                    {mainGoals.map((mainGoal) => (
                        <ListItem
                            disablePadding
                            key={mainGoal._id}
                            sx={{
                                '&:hover .edit-icon': {
                                    opacity: 1,
                                    transform: 'translateX(0)',
                                },
                            }}>
                            <ListItemButton onClick={() => handleSelectedGoal(mainGoal._id)}>
                                <ListItemIcon sx={{ color: 'text.primary', fontSize: "24px" }}>
                                    {mainGoal.emoji}
                                </ListItemIcon>
                                <ListItemText primary={mainGoal.title} />
                                <MoreVertIcon
                                    onClick={(e) => {
                                        e.preventDefault();   // ← これが重要
                                        handleClick(e);
                                    }}
                                    className="actions" />
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
                                >
                                    <EditMainGoalDialog mainGoal={mainGoal} updateMainGoals={updateMainGoals} />
                                    <DeleteMainGoal mainGoal={mainGoal} updateMainGoals={updateMainGoals} />
                                </Popover>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <MainGoalDialog updateMainGoals={updateMainGoals} />
                </List>
            </Drawer>
        </div>
    );
}
