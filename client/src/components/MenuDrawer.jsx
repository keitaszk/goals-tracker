import { useState } from 'react';
import {
    ListSubheader,
    Drawer,
    List,
    ListItemButton,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddMainGoal from './AddMainGoal';
import EditMainGoal from './EditMainGoal';
import DeleteMainGoal from './DeleteMainGoal';
import { ActionsMenu } from './ui/ActionsMenu';
import "./MenuDrawer.css"

export default function MenuDrawer({ mainGoals, handleSelectedGoal, updateMainGoals }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [activeMainGoal, setActiveMainGoal] = useState(null);

    const handleClick = (event, mainGoal) => {
        setAnchorEl(event.currentTarget);
        // pass the mapped mainGoal to the Menu
        setActiveMainGoal(mainGoal);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveMainGoal(null);
    };

    const openMenu = Boolean(anchorEl);

    return (
            <Drawer
                variant='permanent'
                className='menu-drawer'
            >
                <List
                    subheader={
                        <ListSubheader
                            component="div"
                            sx={{
                                textAlign: "left",
                                backgroundColor: "#f3e8ff"
                            }}
                        >
                            Main Goals
                        </ListSubheader>
                    }>
                    {mainGoals.map((mainGoal) => (
                        <ListItem
                            disablePadding
                            className="main-goal-list"
                            key={mainGoal._id}
                        >
                            <ListItemButton onClick={() => handleSelectedGoal(mainGoal._id)}>
                                <ListItemIcon
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: "24px"
                                    }}
                                >
                                    {mainGoal.emoji}
                                </ListItemIcon>
                                <ListItemText primary={mainGoal.title} />
                                <MoreVertIcon
                                    onClick={(e) => {
                                        handleClick(e, mainGoal);
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
                </List>
            </Drawer>
    );
}
