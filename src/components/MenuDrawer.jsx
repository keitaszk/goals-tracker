import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { ListSubheader, Drawer, List, Divider, ListItemButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';

export default function MenuDrawer({ mainGoals, handleSelectedGoal, selectedMainGoal }) {
    return (
        <div>
            <Drawer
                variant='permanent'
                sx={{
                    width: "250px", '& .MuiDrawer-paper': {
                        width: "250px",
                        boxSizing: 'border-box',
                        backgroundColor: selectedMainGoal.themeColor
                    },
                }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FormatListBulletedIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Goals" />
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
                    {mainGoals.map((goal) => (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleSelectedGoal(goal.id)}>
                                {goal.emoji}
                                <ListItemText sx={{ marginLeft: "10px" }} primary={goal.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
