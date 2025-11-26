// cleaned

import { useState } from 'react';
import {
    ListSubheader,
    Drawer,
    List,
    ListItemButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddMainGoal from '../mainGoalActions/AddMainGoal';
import EditMainGoal from '../mainGoalActions/EditMainGoal';
import DeleteMainGoal from '../mainGoalActions/DeleteMainGoal';
import Logout from '../auth/Logout';
import { ActionsMenu } from '../ui/ActionsMenu';
import "./MenuDrawer.css"

export default function MenuDrawer({ mainGoals, handleSelectedGoal, updateMainGoals, selectedMainGoal }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [activeMainGoal, setActiveMainGoal] = useState(null);

    const openMenu = Boolean(anchorEl);

    const handleMenuOpen = (event, mainGoal) => {
        setAnchorEl(event.currentTarget);
        // pass the mapped mainGoal to the Menu
        setActiveMainGoal(mainGoal);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveMainGoal(null);
    };

    return (
        <Drawer
            variant='permanent'
            className='menu-drawer'
        >
            <List
                subheader={
                    <ListSubheader
                        component="div"
                        className='list-subheader'
                    >
                        Main Goals
                    </ListSubheader>
                }>
                <Box sx={{ flexGrow: 1 }}>
                    {mainGoals.map((mainGoal) => (
                        <ListItem
                            disablePadding
                            className="main-goal-list"
                            key={mainGoal._id}
                        >
                            <ListItemButton
                                onClick={() => handleSelectedGoal(mainGoal._id)}
                                selected={selectedMainGoal._id === mainGoal._id}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: "24px"
                                    }}
                                >
                                    {mainGoal.emoji}
                                </ListItemIcon>
                                <ListItemText
                                    sx={{ wordBreak: "break-word" }}
                                    primary={mainGoal.title}
                                />
                                <MoreVertIcon
                                    onClick={(e) => {
                                        handleMenuOpen(e, mainGoal);
                                    }}
                                    className="actions" />
                                {/* Menu renders only once (not one menu per mainGoal) */}
                                <ActionsMenu
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    onClose={(e) => {
                                        e.stopPropagation();
                                        handleMenuClose();
                                    }}>
                                    <EditMainGoal
                                        mainGoal={activeMainGoal}
                                        updateMainGoals={updateMainGoals}
                                        handleMenuClose={handleMenuClose}
                                    />
                                    <DeleteMainGoal
                                        mainGoal={activeMainGoal}
                                        updateMainGoals={updateMainGoals}
                                        handleMenuClose={handleMenuClose}
                                    />
                                </ActionsMenu>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <AddMainGoal updateMainGoals={updateMainGoals} />
                </Box>
            </List>
            <Logout></Logout>
        </Drawer>
    );
}
