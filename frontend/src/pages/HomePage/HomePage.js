import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import Calendar from "../../components/Calendar/Calendar";


const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [randomQuote, setRandomQuote] = useState([[{
    "text": "Life is change. Growth is optional. Choose wisely.",
    "author": "Karen Clark"
  }]])
  const [number, setNumber] = useState([0])
  
 

  useEffect(() => {
     
    getRandomQuote()
    
  }, [token]);

  

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
    <div className="container">
      <h1>Welcome Back {user.username}!</h1>
    </div>
    <div>
          <h2>
            {randomQuote[number].text}
          </h2>
          <h3>
            {randomQuote[number].author}
          </h3>
      </div>
    <div>
      <Calendar/>
    </div>
      </>
  );
};

export default HomePage;
