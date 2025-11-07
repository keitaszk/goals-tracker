import { Button, Stack, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import EditSubGoalDialog from './EditSubGoalDialog';
import DeleteSubGoal from './DeleteSubGoal';
import "../App.css"
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';

function SubGoalCard({ selectedMainGoal, updateMainGoals }) {
    const subGoals = selectedMainGoal.subGoals

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAnchorClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const openEmoji = Boolean(anchorEl);

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
            {subGoals.map((subGoal, index) => (
                <Card className="subgoal-card" key={subGoal._id} sx={{ backgroundColor: subGoal.completed && "#f3e8ff" }}>
                    <CardActionArea disableRipple>
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
                                            borderColor: "#a855f7",
                                            color: "#a855f7",
                                            backgroundColor: subGoal.completed ? "#f3e8ff" : "transparent",
                                            fontWeight: 600,
                                            "&:hover": {
                                                backgroundColor: subGoal.completed ? "#f3e8ff" : "#f9f5ff",
                                                borderColor: "#9333ea",
                                            },
                                        }}
                                    >Completed</Button>
                                    <MoreVertIcon onClick={handleClick} className="actions" />
                                    <Popover
                                        open={openEmoji}
                                        anchorEl={anchorEl}
                                        onClose={handleAnchorClose}
                                        disablePortal
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <EditSubGoalDialog subGoal={subGoal} selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
                                        <DeleteSubGoal subGoal={subGoal} selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
                                    </Popover>
                                </Box>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                {subGoal.dueDate}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </>
    );
}

export default SubGoalCard;
