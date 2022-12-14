// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import FocusAreaTable from "./pages/FocusAreaTable/FocusAreaTable";
import CreateNewTask from "./components/CreateNewTask/CreateNewTask";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./hooks/useAuth";
import Progress from "./components/Progress/Progress";



function App() {

  const [user, token] = useAuth();
  const [focusArea, setFocusArea] = useState([[{
  "focus_area": "useState Test",
  "task": "useState Test",
  "time_of_task": "14:05:00",
  "day_of_week": "2021-12-31",
  "notes": "Test",
  "completed": false,
  "color": "red"
}]]);

  const [parentProgress, setParentProgress] = useState([[{
    "focus_area": "useState Test",
    "task": "useState Test",
    "time_of_task": "14:05:00",
    "day_of_week": "2021-12-31",
    "notes": "Test",
    "completed": false,
    "color": "red"
  }]])
  const [parentCount, setParentCount] = useState([])
    
    
    

    useEffect(() => {
    
        fetchFocusArea() && fetchProgress()
        console.log(focusArea)
        console.log(parentProgress)
        
      }, [token, parentCount]);
    
      
      const fetchFocusArea = async () => {
        try {
          let response = await axios.get("http://127.0.0.1:8000/focus/get/", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setFocusArea(response.data);
        } catch (error) {
          console.log(error.response.data);
        }
      };
      const fetchProgress = async () => {
        try {
          let response = await axios.get("http://127.0.0.1:8000/progress/get/", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setParentProgress(response.data);
        } catch (error) {
          console.log(error.response.data);
        }
      };

  function addNewTask(task){
        let tempTask = [task, ...focusArea]
        setFocusArea(tempTask);
    }

  function addNewProgress(measurement){
      // for GET request update on main screen
      let tempProgress = [measurement, ...parentProgress]
      setParentProgress(tempProgress);
  }
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage userData={focusArea} parentCount={parentCount} setParentCount={setParentCount}/>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/table" element={<FocusAreaTable focusArea={focusArea} setParentCount={setParentCount} parentCount={parentCount} addNewProgress={addNewProgress} parentProgress={parentProgress}/>} />
        <Route path="/addTask" element={<CreateNewTask addNewTask={addNewTask}/>} />
        <Route path="/progress" element={<Progress addNewProgress={addNewProgress} parentProgress={parentProgress}  setParentCount={setParentCount}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
