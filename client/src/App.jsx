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
        if (data.length > 0 && !selectedMainGoal) {
          setSelectedMainGoal(data[0])
        }
      })
      .catch((err) => console.error("Error fetching main goals", err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    console.log("mainGoalsが更新されました", mainGoals);
  }, [mainGoals]);

  useEffect(() => {
    fetchMainGoal();
  }, []);

  const updateMainGoals = async () => {
    // setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/mainGoals");
      if (!res.ok) throw new Error("Failed to fetch main goals");
      const data = await res.json();
      setMainGoals(data);
    } catch (err) {
      console.error("Error updating main goals", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mainGoals.length > 0) {
      console.log("selected main goalも更新")
      // 現在の選択中IDを保持していれば、それに一致するgoalを再設定
      setSelectedMainGoal((prev) => {
        if (!prev) return mainGoals[0]; // 初期選択
        const updated = mainGoals.find((g) => g._id === prev._id);
        return updated || mainGoals[0]; // 同じidが見つかれば更新
      });
    }
  }, [mainGoals]);

  const onSelectGoal = (goalId) => {
    setSelectedMainGoal(mainGoals.find(g => g._id === goalId));
    console.log(`selected main goal: ${selectedMainGoal.title}`)
  }

  if (!isLoading && selectedMainGoal) {
    return (
      <Box sx={{ display: 'flex' }}>
        <MenuDrawer mainGoals={mainGoals} handleSelectedGoal={onSelectGoal} selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
        <Box sx={{ flexGrow: 1 }}>
          <MainGoal selectedMainGoal={selectedMainGoal} updateMainGoals={updateMainGoals} />
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
