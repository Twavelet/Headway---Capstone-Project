import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const [randomQuote, setRandomQuote] = useState([props.parentQuotes])

  useEffect(() => {
    const fetchCars = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchCars() && getRandomQuote();
  }, [token || props.parentQuotes]);

  async function getRandomQuote() {
    const quote = Math.floor(Math.random() * 1644)
    setRandomQuote(props.parentQuotes[quote])
    console.log(quote)
  
    
  }

  return (
<>
    <div className="container">
      <h1>Welcome Back {user.username}!</h1>
      {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))}
    </div>
    <div>
          <div>
       <h2>
        {randomQuote && `"${randomQuote.text}"`}
       </h2>
       <h3>
       {randomQuote && `~${randomQuote.author}`}
       </h3>
      
    </div>
      </div>
      </>
  );
};

export default HomePage;
