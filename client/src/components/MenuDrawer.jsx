import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { ListSubheader, Drawer, List, Divider, ListItemButton, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MainGoalDialog from './MainGoalDialog';
import EditMainGoalDialog from './EditMainGoalDialog';
import DeleteMainGoal from './DeleteMainGoal';

export default function MenuDrawer({ mainGoals, handleSelectedGoal, selectedMainGoal }) {
    return (
        <div>
            <Drawer
                variant='permanent'
                sx={{
                    width: "250px", '& .MuiDrawer-paper': {
                        width: "250px",
                        boxSizing: 'border-box',
                        backgroundColor: selectedMainGoal.themeColor,
                    },
                }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FormatListBulletedIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Goals" />
                            {/* for the calendar view */}
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List
                    subheader={
                        <ListSubheader component="div" sx={{ textAlign: "left", backgroundColor: selectedMainGoal.themeColor }}>
                            Main Goals
                        </ListSubheader>
                    }>
                    {mainGoals.map((mainGoal) => (
                        <ListItem
                            disablePadding
                            key={mainGoal.id}
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
                                {/* <EditIcon
                                    className="edit-icon"
                                    fontSize="small"
                                    sx={{
                                        opacity: 0,
                                        transition: 'opacity 0.2s ease, transform 0.2s ease',
                                    }}
                                // onClick={handleEditMaingoal}
                                /> */}
                                <EditMainGoalDialog mainGoal={mainGoal}  />
                                <DeleteMainGoal mainGoal={mainGoal} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <MainGoalDialog />
                </List>
            </Drawer>
        </div>
    );
}
