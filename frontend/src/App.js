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


function App() {

  const [user, token] = useAuth();
    const [focusArea, setFocusArea] = useState([]);
    
    
    

    useEffect(() => {
    
        fetchFocusArea()
        
      }, [token]);
    
      
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

  function addNewTask(task){
        let tempTask = [task, ...focusArea]
        setFocusArea(tempTask);
    }

  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage userData={focusArea}/>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/table" element={<FocusAreaTable />} />
        <Route path="/addTask" element={<CreateNewTask addNewTask={addNewTask}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
