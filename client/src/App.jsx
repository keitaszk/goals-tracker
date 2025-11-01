import { Box } from '@mui/material'
import './App.css'
import MenuDrawer from './components/MenuDrawer'
import MainGoal from './components/MainGoal'
import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function App() {

  const [mainGoals, setMainGoals] = useState([]);
  const [selectedMainGoal, setSelectedMainGoal] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchMainGoal = async () => {
    return fetch("http://localhost:3000/api/mainGoals")
      .then((res) => res.json())
      .then((data) => {
        setMainGoals(data)
        if (data.length > 0) {
          setSelectedMainGoal(data[0])
        }
      })
      .catch((err) => console.error("Error fetching main goals", err))
      .finally(() => setIsLoading(false));
  }

  const updateMainGoals = async () => {
    setIsLoading(true);
    return fetch("http://localhost:3000/api/mainGoals")
      .then((res) => res.json())
      .then((data) => {
        setMainGoals(data)
      })
      .catch((err) => console.error("Error fetching main goals", err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchMainGoal();
    setSelectedMainGoal(mainGoals[0])
  }, []);

  const onSelectGoal = (goalId) => {
    setSelectedMainGoal(mainGoals.find(g => g._id === goalId));
  }

  if (isLoading || !selectedMainGoal) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <MenuDrawer mainGoals={mainGoals} handleSelectedGoal={onSelectGoal} selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals}/>
      <Box sx={{ flexGrow: 1 }}>
        <MainGoal selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
      </Box>
    </Box>
  )
}

export default App
