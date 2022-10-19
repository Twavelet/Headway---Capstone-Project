import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
// import CreateNewTask from "../../components/CreateNewTask/CreateNewTask";
import EditTask from "../../components/EditTask/EditTask";
import { useNavigate } from "react-router-dom";


const FocusAreaTable = () => {

    const [user, token] = useAuth();
    const [focusArea, setFocusArea] = useState([]);
    const [count, setCount] = useState([])
    const navigate = useNavigate();
    const [show, setShow] = useState([true])
    const [edit, setEdit] = useState([])
    

    useEffect(() => {
    
        fetchFocusArea()
        
      }, [token, count]);
    
      
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


      


    console.log(focusArea)


    async function handleDelete(del) {
        console.log(del)
        
        return await axios.delete(`http://127.0.0.1:8000/focus/delete/${del.id}/`, {
            headers: {
                Authorization: "Bearer " + token,
            }, }) && setCount(count+1)
            

        } 

    

    async function handleEdit(userInfo) {
        console.log(userInfo)
        setShow(false)
        setEdit(userInfo)
    }
    

    
    return(
        <><> 
        {show ? (
                <><div className="container">
                <h1>Welcome Back {user.username}!</h1>
            </div><table className="table table-striped bg-info p-2 text-dark bg-opacity-10">
                    <thead>
                        <tr>
                            <th scope="col">Focus Area</th>
                            <th scope="col">Task</th>
                            <th scope="col">Time</th>
                            <th scope="col">Day</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Completion</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    {focusArea.map((entry, index) => {
                        return (
                            <tr key={index}>
                                <td>{entry.focus_area}</td>
                                <td>{entry.task}</td>
                                <td>{entry.time_of_task}</td>
                                <td>{entry.day_of_week}</td>
                                <td>{entry.notes}</td>
                                <td><input type="checkbox"/></td>
                                <td><button onClick={() => handleDelete(entry)}>Delete</button></td>
                                <td><button onClick={() => handleEdit(entry)}>Edit</button></td>
                                
                                
                            </tr>
                        );
                    })}
                </table></>
                    ) : (<EditTask userInfo={edit} setShow = {setShow}/>)
        } 


        
                </></>

                )
    
                
    }

export default FocusAreaTable;