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
import { useEffect, useState } from "react";
import axios from "axios";


function App() {

const [quotes, setQuotes] = useState([])
 
useEffect(() => {
  getQuotes()
}, [])

async function getQuotes() {
  try{
    const response = await axios.get("https://type.fit/api/quotes");
    console.log(response.data)
    setQuotes(response.data);

  }
  catch(error){
    console.log(error.response)
  }
}



  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage parentQuotes ={quotes} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
