import {
    ListSubheader,
    Drawer,
    List,
} from '@mui/material';
import AddMainGoal from './AddMainGoal';
import "./MenuDrawer.css"

export default function EmptyDrawer({ loadMainGoals }) {
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
                    <AddMainGoal updateMainGoals={loadMainGoals} />
                </List>
            </Drawer>
    );
}
