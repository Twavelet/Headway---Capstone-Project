import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [focusArea, setFocusArea] = useState([]);
  const [randomQuote, setRandomQuote] = useState([[{
    "text": "Life is change. Growth is optional. Choose wisely.",
    "author": "Karen Clark"
  }]])
  const [number, setNumber] = useState([0])
 

  useEffect(() => {
    
    fetchFocusArea() && 
    getRandomQuote()
    
  }, [token]);

  const fetchFocusArea= async () => {
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
       <>
       <h2>
            {randomQuote[number].text}
          </h2>
          <h3>
              {randomQuote[number].author}
            </h3>
            </>
      </div>
      <table className="table table-striped bg-info p-2 text-dark bg-opacity-10">
        <thead>
          <tr>
            <th scope="col">Focus Area</th>
            <th scope="col">Task</th>
            <th scope="col">Time</th>
            <th scope="col">Day</th>
          </tr>
        </thead>
        {focusArea.map((entry, index) => {
            return (
            <tr key={index}>
              <td>{entry.focus_area}</td>
              <td>{entry.task}</td>
              <td>{entry.time_of_task}</td>
              <td>{entry.day_of_week}</td>
            </tr>
            );
        })}
    </table>
      </>
  );
};

export default HomePage;
