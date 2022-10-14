import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { useState } from "react";
import axios from "axios";


const LoginPage = (props) => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    loginUser
  );
  const [randomQuote, setRandomQuote] = useState([])

  useEffect(() => {
    getRandomQuote()
  }, [props.parentQuotes]);

  



async function getRandomQuote() {
  const quote = Math.floor(Math.random() * 1644)
  setRandomQuote(props.parentQuotes[quote])
  console.log(quote)

  
}
console.log(randomQuote)
  return (
    <>
    <div>

       <h2>
        {randomQuote && `"${randomQuote.text}"`}
       </h2>
       <h3>
       {randomQuote && `~${randomQuote.author}`}
       </h3>
      
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
