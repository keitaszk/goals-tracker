import { ListSubheader, Drawer, List, ListItemButton, ListItem, ListItemIcon, ListItemText, } from '@mui/material';
import MainGoalDialog from './MainGoalDialog';
import EditMainGoalDialog from './EditMainGoalDialog';
import DeleteMainGoal from './DeleteMainGoal';

export default function MenuDrawer({ mainGoals, handleSelectedGoal, updateMainGoals }) {
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
                                <EditMainGoalDialog mainGoal={mainGoal} updateMainGoals={updateMainGoals}/>
                                <DeleteMainGoal mainGoal={mainGoal} updateMainGoals={updateMainGoals}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <MainGoalDialog updateMainGoals={updateMainGoals}/>
                </List>
            </Drawer>
        </div>
    );
}
