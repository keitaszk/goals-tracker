// cleaned

import { useState } from 'react';
import dayjs from 'dayjs';
import {
    Stack,
    Card,
    CardContent,
    Typography,
    CardActionArea,
    Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditSubgoal from '../subgoalActions/EditSubgoal';
import DeleteSubgoal from '../subgoalActions/DeleteSubgoal';
import { CompletedButton } from '../ui/CompletedButton';
import { ActionsMenu } from '../ui/ActionsMenu';
import { BASE_URL } from "../../config";
import "./SubgoalCard.css"

export default function SubgoalCard({ selectedMainGoal, updateMainGoals }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [activeSubgoal, setActiveSubgoal] = useState(null);

    const subGoals = selectedMainGoal.subGoals
    const mainGoalId = selectedMainGoal._id
    const token = localStorage.getItem("token");
    const openMenu = Boolean(anchorEl);

    const handleMenuOpen = (event, subGoal) => {
        setAnchorEl(event.currentTarget);
        setActiveSubgoal(subGoal)
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveSubgoal(null);
    };

    const toggleSubGoal = async (subGoalId) => {
        try {
            const res = await fetch(
                `${BASE_URL}/mainGoals/${mainGoalId}/subgoals/${subGoalId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
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

                const daysDiff = dayjs(subGoal.dueDate).startOf("day").diff(dayjs().startOf("day"), "day");
                const isToday = dayjs(subGoal.dueDate).isSame(dayjs(), "day");
                const isPast = dayjs(subGoal.dueDate).isBefore(dayjs(), "day");
                const absDays = Math.abs(daysDiff);

                let daysColor = "";
                let daysText = "";

                if (isToday) {
                    daysColor = "#ff0000";
                    daysText = "Today";
                } else if (isPast) {
                    daysColor = "#ff0000";
                    daysText = absDays === 1 ? "Yesterday" : `${absDays} days ago`;
                } else {
                    daysColor = "text.secondary";
                    daysText = absDays === 1 ? "Tomorrow" : `${absDays} days left`;
                }

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
                                    <Typography
                                        variant="h6"
                                        fontWeight="600"
                                        // component="div"
                                        sx={{
                                            // maxWidth: "500px",
                                            textDecoration: subGoal.completed && "line-through",
                                            color: subGoal.completed ? "text.secondary" : "text.primary",
                                            wordBreak: "break-word",
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
                                        <MoreVertIcon onClick={(e) => handleMenuOpen(e, subGoal)} className="actions" />
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
                                        color: daysColor
                                    }}
                                >
                                    {daysText}
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
