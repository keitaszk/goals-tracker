import { Box } from '@mui/material'
import './App.css'
import MenuDrawer from './components/MenuDrawer'
import MainGoal from './components/MainGoal'
import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
// const mainGoals = [
//   {
//     title: "IT Company",
//     dueDate: "6-30-2026",
//     emoji: "🖥️",
//     completed: false,
//     themeColor: "#f3e8ff",
//     id: 1,
//     subGoals: [
//       { title: "Portfolio", dueDate: "11-15-2025", completed: true },
//       { title: "基本情報技術者", dueDate: "01-30-2026", completed: false },
//       { title: "AtCoder", dueDate: "03-30-2026", completed: false },
//     ]
//   },
//   {
//     title: "Boxing",
//     dueDate: "05-20-2027",
//     emoji: "🥊",
//     themeColor: "#c8f4e7ff",
//     completed: false,
//     id: 2,
//     subGoals: [
//       { title: "Choose the gym", dueDate: "06-30-2026", completed: false },
//       { title: "Spar", dueDate: "01-30-2027", completed: false },
//     ]
//   },
//   {
//     title: "English",
//     dueDate: "12-31-2028",
//     emoji: "🎧",
//     themeColor: "#fff4c9ff",
//     completed: false,
//     id: 3,
//     subGoals: [
//       { title: "Watch 100 movies", dueDate: "06-30-2026", completed: false },
//       { title: "Listen to podcasts", dueDate: "05-05-2027", completed: false },
//     ]
//   },
// ]

function App() {

  const [mainGoals, setMainGoals] = useState([]);
  const [selectedMainGoal, setSelectedMainGoal] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchMainGoal = async () => {
    fetch("http://localhost:3000/api/mainGoals")
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

  useEffect(() => {
    fetchMainGoal();
  }, []);


  // const selectedMainGoal = mainGoals.find((mainGoal) => mainGoal.id === selectedGoalId)
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
      <MenuDrawer mainGoals={mainGoals} handleSelectedGoal={onSelectGoal} selectedMainGoal={selectedMainGoal} fetchMainGoal={fetchMainGoal}/>
      <Box sx={{ flexGrow: 1 }}>
        <MainGoal selectedMainGoal={selectedMainGoal} fetchMainGoal={fetchMainGoal}/>
      </Box>
    </Box>
  )
}

export default App
