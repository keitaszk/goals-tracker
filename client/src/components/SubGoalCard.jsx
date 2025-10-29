import { Button, Stack, Card, CardContent, Typography, CardActionArea } from '@mui/material';

function SubGoalCard({ goal, fetchMainGoal }) {
    const subGoals = goal.subGoals

    const toggleSubGoal = async (subGoalId) => {
        try {
            console.log(subGoalId)
            const res = await fetch(
                `http://localhost:3000/api/subgoals/${subGoalId}`,
                { method: "PATCH", headers: { "Content-Type": "application/json" } }
            );
            if (res.ok) {
                console.log("subGoalToggle fetch成功");
                fetchMainGoal();
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
                <Card key={index} sx={{ backgroundColor: subGoal.completed && "#f3e8ff" }}>
                    <CardActionArea disableRipple>
                        <CardContent
                        >
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" fontWeight="600" component="div"
                                    sx={{
                                        textDecoration: subGoal.completed && "line-through",
                                        color: subGoal.completed ? "text.secondary" : "text.primary",
                                    }}>
                                    {index + 1}. {subGoal.title}
                                </Typography>
                                <Button
                                    variant={subGoal.completed ? "contained" : "outlined"}
                                    // disabled={subGoal.completed}
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
