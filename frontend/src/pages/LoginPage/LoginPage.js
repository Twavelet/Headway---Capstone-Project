import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { useState } from "react";
import axios from "axios";
import makeCancelable from 'makecancelable';

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    loginUser
  );
  const [randomQuote, setRandomQuote] = useState([[{
    "text": "What you give is what you get.",
    "author": "Byron Pulsifer"
  }]])
  const [number, setNumber] = useState([0])
  
  

  useEffect(() => {
    getRandomQuote()
  
  }, []);

  async function getRandomQuote() {
    try{
      // debugger;
      const response = await axios.get("https://type.fit/api/quotes");
      setRandomQuote(response.data)
      const quote = Math.floor(Math.random() * 1644)
      setNumber(quote);

      
    }
    catch(error){
      console.log(error.response)
    }
  }
    
  
  console.log(randomQuote)
  console.log(number)

  return (
    <>
    <div>

       <>
       <h2>
            {randomQuote[number].text}
          </h2>
          <h3>
              {randomQuote[number].author}
            </h3>
            </>
       

      
    </div>
    <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Username:{" "}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange} />
          </label>
          <label>
            Password:{" "}
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange} />
          </label>
          {isServerError ? (
            <p className="error">Login failed, incorrect credentials!</p>
          ) : null}
          <Link to="/register">Click to register!</Link>
          <button>Login!</button>
        </form>
      </div></>
  );
};

export default LoginPage;
