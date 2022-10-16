import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  // const [cars, setCars] = useState([]);
  const [randomQuote, setRandomQuote] = useState([[{
    "text": "Life is change. Growth is optional. Choose wisely.",
    "author": "Karen Clark"
  }]])
  const [number, setNumber] = useState([0])
 

  useEffect(() => {
    
    // fetchCars() && 
    getRandomQuote()
    
  }, [token]);

  // const fetchCars = async () => {
  //   try {
  //     let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     setCars(response.data);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

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
      </div>
      </>
  );
};

export default HomePage;
