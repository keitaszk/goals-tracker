import { Box } from '@mui/material'
import './App.css'
import MenuDrawer from './components/MenuDrawer'
import MainGoal from './components/MainGoal'
import { useState } from 'react'

const mainGoals = [
  {
    title: "IT Company",
    dueDate: "6-30-2026",
    emoji: "🖥️",
    completed: false,
    themeColor: "#f3e8ff",
    id: 1,
    subGoals: [
      { title: "Portfolio", dueDate: "11-15-2025", completed: true },
      { title: "基本情報技術者", dueDate: "01-30-2026", completed: false },
      { title: "AtCoder", dueDate: "03-30-2026", completed: false },
    ]
  },
  {
    title: "Boxing",
    dueDate: "05-20-2027",
    emoji: "🥊",
    themeColor: "#c8f4e7ff",
    completed: false,
    id: 2,
    subGoals: [
      { title: "Choose the gym", dueDate: "06-30-2026", completed: false },
      { title: "Spar", dueDate: "01-30-2027", completed: false },
    ]
  },
  {
    title: "English",
    dueDate: "12-31-2028",
    emoji: "🎧",
    themeColor: "#fff4c9ff",
    completed: false,
    id: 3,
    subGoals: [
      { title: "Watch 100 movies", dueDate: "06-30-2026", completed: false },
      { title: "Listen to podcasts", dueDate: "05-05-2027", completed: false },
    ]
  },
]

function App() {
  const [selectedGoalId, setSelectedGoalId] = useState(mainGoals[0].id);
  const selectedMainGoal = mainGoals.find((mainGoal) => mainGoal.id === selectedGoalId)
  const onSelectGoal = (goalId) => {
    setSelectedGoalId(goalId)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <MenuDrawer mainGoals={mainGoals} handleSelectedGoal={onSelectGoal} selectedMainGoal={selectedMainGoal} />
      <Box sx={{ flexGrow: 1 }}>
        <MainGoal selectedMainGoal={selectedMainGoal} />
      </Box>
    </Box>
  )
}

export default App
