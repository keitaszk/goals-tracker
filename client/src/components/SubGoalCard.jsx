import { Button, Stack, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import EditSubGoalDialog from './EditSubGoalDialog';
import DeleteSubGoal from './DeleteSubGoal';
import "../App.css"
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import dayjs from 'dayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function SubGoalCard({ selectedMainGoal, updateMainGoals }) {
    const subGoals = selectedMainGoal.subGoals

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
                `http://localhost:3000/api/subgoals/${subGoalId}`,
                { method: "PATCH", headers: { "Content-Type": "application/json" } }
            );
            if (res.ok) {
                updateMainGoals();
                console.log("subGoalToggle fetch成功");
            } else {
                console.error();
            }
        }
        catch (err) {
            console.error("通信エラー", err)
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
                        }}>
                        <CardActionArea disableRipple sx={{
                            "&:focus": {
                                outline: "none"
                            },
                            "&:active": {
                                outline: "none"
                            },
                        }}>
                            <CardContent>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="h6" fontWeight="600" component="div"
                                        sx={{
                                            textDecoration: subGoal.completed && "line-through",
                                            color: subGoal.completed ? "text.secondary" : "text.primary",
                                        }}>
                                        {index + 1}. {subGoal.title}
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
                                        <Button
                                            variant={subGoal.completed ? "contained" : "outlined"}
                                            onClick={() => toggleSubGoal(subGoal._id)}
                                            sx={{
                                                borderColor: "#A76DF3",
                                                color: "#A76DF3",
                                                backgroundColor: subGoal.completed ? "#f4e9ff" : "transparent",
                                                fontWeight: 600,
                                                "&:hover": {
                                                    backgroundColor: subGoal.completed ? "#f3e8ff" : "#f9f5ff",
                                                    borderColor: "#9333ea",
                                                },
                                                "&:active": {
                                                    outline: "none"
                                                },
                                                "&:focus": { outline: "none" },
                                            }}
                                        >Completed</Button>
                                        <MoreVertIcon onClick={(e) => handleClick(e, subGoal)} className="actions" />
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={openMenu}
                                            onClose={handleMenuClose}
                                            PaperProps={{
                                                elevation: 4,
                                                sx: {
                                                    borderRadius: 2,
                                                    mt: 1,
                                                    minWidth: 180,
                                                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                                                }
                                            }}
                                        >
                                            <EditSubGoalDialog subGoal={activeSubgoal} selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} handleMenuClose={handleMenuClose} />
                                            <DeleteSubGoal subGoal={activeSubgoal} selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} handleMenuClose={handleMenuClose} />
                                        </Menu>
                                    </Box>
                                </Stack>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: dayjs(subGoal.dueDate).isAfter(dayjs(), "day")
                                            ? "text.secondary"
                                            : "#ff0000",
                                        display: subGoal.completed && "none"
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

export default SubGoalCard;
