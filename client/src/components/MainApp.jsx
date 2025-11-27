// cleaned

import {
  useState,
  useEffect
} from 'react'
import {
  Box,
  CircularProgress,
  Typography,
  Stack
} from '@mui/material'
import MenuDrawer from './drawer/MenuDrawer'
import MainGoal from './sections/MainGoal'
import EmptyDrawer from './drawer/EmptyDrawer'
import targetImg from "../assets/target.png"
import { BASE_URL } from "../config";
import "./MainApp.css"

export default function MainApp() {

  const [mainGoals, setMainGoals] = useState([]);
  const [selectedMainGoal, setSelectedMainGoal] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

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

  const loadMainGoals = async (shouldSelectDefault = false) => {
    try {
      const res = await fetch(`${BASE_URL}/mainGoals`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
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

  const onSelectGoal = (goalId) => {
    setSelectedMainGoal(mainGoals.find(g => g._id === goalId));
  };

  // initial view
  if (mainGoals.length === 0 && !isLoading) {
    return (
      <Box className="main-app-container">
        <EmptyDrawer loadMainGoals={loadMainGoals(true)}>
        </EmptyDrawer>
        <Box className="main-goal-wrapper">
          <Stack sx={{ alignItems: "center" }}>
            <img
              src={targetImg}
              alt="target illustration"
              style={{ width: 400 }}
            />
            <Typography fontSize="30px" fontWeight="600">
              Ready to set your first main goal?
            </Typography>
          </Stack>
        </Box>
      </Box>
    )
  }
  if (selectedMainGoal && !isLoading) {
    return (
      <Box className="main-app-container" >
        <MenuDrawer
          mainGoals={mainGoals}
          handleSelectedGoal={onSelectGoal}
          selectedMainGoal={selectedMainGoal}
          updateMainGoals={updateMainGoals}
        />
        <Box className="main-goal-wrapper">
          <MainGoal
            selectedMainGoal={selectedMainGoal}
            updateMainGoals={updateMainGoals}
          />
        </Box>
      </Box>
    )
  }
  return (
    <Box className="loading">
      <CircularProgress color="secondary" />
    </Box>
  )
}
