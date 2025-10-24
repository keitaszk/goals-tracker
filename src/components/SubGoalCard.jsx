import { Button, Stack, Box, Card, CardContent, Typography, CardActionArea } from '@mui/material';

function SubGoalCard({ goal }) {
    const subGoals = goal.subGoals
    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gap: 2,
                textAlign: "left"
            }}
        >
            {subGoals.map((subGoal, index) => (
                <Card sx={{ backgroundColor: subGoal.completed && "#f3e8ff" }}>
                    <CardActionArea disableRipple>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" fontWeight="600" component="div"
                                    sx={{
                                        textDecoration: subGoal.completed && "line-through",
                                        color: subGoal.completed ? "text.secondary" : "text.primary",
                                    }}>
                                    {index + 1}. {subGoal.title}
                                </Typography>
                                <Button variant={subGoal.completed ? "contained" : "outlined"}
                                    disabled={subGoal.completed}
                                    sx={{
                                        borderColor: "#a855f7",
                                        color: subGoal.completed ? "#a855f7" : "#a855f7",
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
        </Box>
    );
}

export default SubGoalCard;
