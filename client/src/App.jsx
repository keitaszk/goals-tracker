import './App.css'
import MenuDrawer from './components/MenuDrawer'
import MainGoal from './components/MainGoal'
import { Box, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'

function App() {

  const [mainGoals, setMainGoals] = useState([]);
  const [selectedMainGoal, setSelectedMainGoal] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchMainGoal = async () => {
    return fetch("http://localhost:3000/api/mainGoals")
      .then((res) => res.json())
      .then((data) => {
        setMainGoals(data)
        // setSelectedMainGoal((prev) => prev ?? data[0]);
        if (data.length > 0 && !selectedMainGoal) {
          setSelectedMainGoal(data[0])
        }
      })
      .catch((err) => console.error("Error fetching main goals", err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchMainGoal();
  }, []);

  // useEffect(() => {
  //   updateMainGoals();
  // }, [mainGoals])

  //   useEffect(() => {
  //   if (mainGoals.length > 0 && !selectedMainGoal) {
  //     fetchMainGoal();
  //     setSelectedMainGoal(mainGoals[0]);
  //   }
  // }, [mainGoals, selectedMainGoal]);

  // useEffect(() => {
  //   fetchMainGoal().then(() => {
  //     setSelectedMainGoal(mainGoals[0]);
  //   }).finally(() => setIsLoading(false))
  // }, []);

  const onSelectGoal = (goalId) => {
    setSelectedMainGoal(mainGoals.find(g => g._id === goalId));
  }

  if (!isLoading && selectedMainGoal) {
    return (
      <Box sx={{ display: 'flex' }}>
        <MenuDrawer mainGoals={mainGoals} handleSelectedGoal={onSelectGoal} selectedMainGoal={selectedMainGoal} />
        <Box sx={{ flexGrow: 1 }}>
          <h1>{selectedMainGoal.title}</h1>
          <MainGoal selectedMainGoal={selectedMainGoal} />
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color="secondary" />
    </Box>
  );
}

export default App
