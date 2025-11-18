// cleaned

import { useState, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import MenuDrawer from './components/MenuDrawer'
import MainGoal from './components/MainGoal'
import './App.css'

export default function App() {

  const [mainGoals, setMainGoals] = useState([]);
  const [selectedMainGoal, setSelectedMainGoal] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const loadMainGoals = async (shouldSelectDefault = false) => {
    try {
      const res = await fetch("http://localhost:3000/mainGoals");
      if (!res.ok) throw new Error("Failed to fetch main goals");

      const data = await res.json();
      setMainGoals(data);

      if (shouldSelectDefault && data.length > 0 && !selectedMainGoal) {
        setSelectedMainGoal(data[0]);
      }
    } catch (err) {
      console.error("Error loading main goals", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMainGoals(true);
  }, []);

  const updateMainGoals = () => loadMainGoals(false);

  // sync selectedMainGoal with any edits and update the UI immidiately
  useEffect(() => {
    if (mainGoals.length > 0) {
      setSelectedMainGoal((prev) => {
        if (!prev) return mainGoals[0];
        const updated = mainGoals.find((g) => g._id === prev._id);
        return updated || mainGoals[0];
      });
    }
  }, [mainGoals]);

  const onSelectGoal = (goalId) => {
    setSelectedMainGoal(mainGoals.find(g => g._id === goalId));
  };

  if (!isLoading && selectedMainGoal) {
    return (
      <Box sx={{ display: 'flex' }}>
        <MenuDrawer
          mainGoals={mainGoals}
          handleSelectedGoal={onSelectGoal}
          selectedMainGoal={selectedMainGoal}
          updateMainGoals={updateMainGoals}
        />
        <Box sx={{ flexGrow: 1 }}>
          <MainGoal
            selectedMainGoal={selectedMainGoal}
            updateMainGoals={updateMainGoals}
          />
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <CircularProgress color="secondary" />
    </Box>
  );
}
