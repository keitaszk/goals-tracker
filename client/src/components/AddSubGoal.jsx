import { Box, Card, CardContent, CardActionArea } from '@mui/material';
import SubGoalDialog from './SubGoalDialog';

function AddSubGoal({ updateMainGoals, selectedMainGoal }) {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gap: 2,
                textAlign: "left"
            }}
        >
            <Card>
                <CardActionArea>
                    <CardContent
                        sx={{
                            display: "flex",
                            justifyContent: "center", // centers horizontally
                            alignItems: "center",     // centers vertically
                        }}>
                        <SubGoalDialog updateMainGoals={updateMainGoals} selectedMainGoal={selectedMainGoal} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}

export default AddSubGoal;
