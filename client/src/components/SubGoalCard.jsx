// cleaned

import { useState } from 'react';
import {
    Stack,
    Card,
    CardContent,
    Typography,
    CardActionArea,
    Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import EditSubgoal from './EditSubgoal';
import DeleteSubgoal from './DeleteSubgoal';
import { CompletedButton } from './ui/CompletedButton';
import { ActionsMenu } from './ui/ActionsMenu';
import "./SubgoalCard.css"

export default function SubgoalCard({ selectedMainGoal, updateMainGoals }) {

    const subGoals = selectedMainGoal.subGoals
    const mainGoalId = selectedMainGoal._id

    const [anchorEl, setAnchorEl] = useState(null);
    const [activeSubgoal, setActiveSubgoal] = useState(null);

    const handleClick = (event, subGoal) => {
        setAnchorEl(event.currentTarget);
        setActiveSubgoal(subGoal)
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveSubgoal(null);
    };

    const openMenu = Boolean(anchorEl);

    const toggleSubGoal = async (subGoalId) => {
        try {
            const res = await fetch(
                `http://localhost:3000/mainGoals/${mainGoalId}/subgoals/${subGoalId}`,
                { method: "PATCH", headers: { "Content-Type": "application/json" } }
            );
            if (res.ok) {
                updateMainGoals();
            } else {
                console.error("Request failed with status", res.status);
            }
        }
        catch (err) {
            console.error("Error connecting", err)
        }
    };

    return (
        <>
            {subGoals.map((subGoal, index) => {
                const daysLeft = dayjs(subGoal.dueDate).diff(dayjs(), "day")
                return (
                    <Card
                        className="subgoal-card"
                        key={subGoal._id}
                        sx={{
                            backgroundColor: subGoal.completed && "#f3e8ff",
                        }}
                    >
                        <CardActionArea
                            disableRipple
                            className='no-outline'
                        >
                            <CardContent>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h6" fontWeight="600" component="div"
                                        sx={{
                                            textDecoration: subGoal.completed && "line-through",
                                            color: subGoal.completed ? "text.secondary" : "text.primary",
                                        }}>
                                        {index + 1}. {subGoal.title}
                                    </Typography>
                                    <Box className='button-menu'>
                                        <CompletedButton
                                            variant={subGoal.completed ? "contained" : "outlined"}
                                            onClick={() => toggleSubGoal(subGoal._id)}
                                            sx={{
                                                backgroundColor: subGoal.completed ? "#f4e9ff" : "transparent",
                                                "&:hover": {
                                                    backgroundColor: subGoal.completed ? "#f3e8ff" : "#f9f5ff",
                                                },
                                            }}
                                        >
                                            Completed
                                        </CompletedButton>
                                        <MoreVertIcon onClick={(e) => handleClick(e, subGoal)} className="actions" />
                                        <ActionsMenu
                                            anchorEl={anchorEl}
                                            open={openMenu}
                                            onClose={handleMenuClose}
                                        >
                                            <EditSubgoal
                                                subGoal={activeSubgoal}
                                                selectedMainGoal={selectedMainGoal}
                                                updateMainGoals={updateMainGoals}
                                                handleMenuClose={handleMenuClose}
                                            />
                                            <DeleteSubgoal
                                                subGoal={activeSubgoal}
                                                selectedMainGoal={selectedMainGoal}
                                                updateMainGoals={updateMainGoals}
                                                handleMenuClose={handleMenuClose}
                                            />
                                        </ActionsMenu>
                                    </Box>
                                </Stack>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: subGoal.completed && "none",
                                        color: dayjs(subGoal.dueDate).isAfter(dayjs(), "day")
                                            ? "text.secondary"
                                            : "#ff0000",
                                    }}
                                >
                                    {dayjs(subGoal.dueDate).isSame(dayjs(), "day")
                                        ? "Today"
                                        : dayjs(subGoal.dueDate).isBefore(dayjs(), "day")
                                            ? `${Math.abs(daysLeft)} days ago`
                                            : `${daysLeft} days left`}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            }
            )}
        </>
    );
}
