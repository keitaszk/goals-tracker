import { ListSubheader, Drawer, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Card, } from '@mui/material';
import MainGoalDialog from './MainGoalDialog';
import EditMainGoalDialog from './EditMainGoalDialog';
import DeleteMainGoal from './DeleteMainGoal';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import "../App.css"

export default function MenuDrawer({ mainGoals, handleSelectedGoal, updateMainGoals }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [activeMainGoal, setActiveMainGoal] = useState(null);

    const handleClick = (event, mainGoal) => {
        setAnchorEl(event.currentTarget);
        setActiveMainGoal(mainGoal);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveMainGoal(null);
    };

    const openMenu = Boolean(anchorEl);

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
                            className="subgoal-card"
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
                                        handleClick(e, mainGoal);
                                    }}
                                    className="actions" />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    onClose={handleMenuClose}
                                    PaperProps={{
                                        elevation: 4,
                                        sx: {
                                            borderRadius: 2,
                                            mt: 1,
                                            minWidth: 180
                                        }
                                    }}
                                >
                                    <EditMainGoalDialog mainGoal={activeMainGoal} updateMainGoals={updateMainGoals} handleMenuClose={handleMenuClose} />
                                    <DeleteMainGoal mainGoal={activeMainGoal} updateMainGoals={updateMainGoals} handleMenuClose={handleMenuClose} />
                                </Menu>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <MainGoalDialog updateMainGoals={updateMainGoals} />
                </List>
            </Drawer>
        </div>
    );
}
