import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
// import CreateNewTask from "../../components/CreateNewTask/CreateNewTask";
import EditTask from "../../components/EditTask/EditTask";
// import { useNavigate } from "react-router-dom";
import moment from 'moment';

const FocusAreaTable = () => {

    const [user, token] = useAuth();
    const [focusArea, setFocusArea] = useState([]);
    const [count, setCount] = useState([])
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
    }

    //     function alertReminder(focusArea){
    //         let currentTime = moment().format('YYYY-MM-DD HH:m:s')
    //             debugger
    //             let findFalse = focusArea.filter((el) => {
    //                return el.completed === false
    //             })
    //             let reminder = findFalse.filter((ele) => {
    //                 if (currentTime.includes( ele.day_of_week && ele.time_of_task)){
    //                         alert("Dont Break the Chain!") 
    //                         console.log("Working")
                            
    //                     return reminder
    //                     }
                    
    //             })
                
    //        };

    //   ;


      


    console.log(focusArea)


    async function handleDelete(del) {
        console.log(del)
        
        return await axios.delete(`http://127.0.0.1:8000/focus/delete/${del.id}/`, {
            headers: {
                Authorization: "Bearer " + token,
            }, }) && setCount(count+1)
            

        } 

    

    function handleEdit(userInfo) {
        console.log(userInfo)
        setShow(false)
        setEdit(userInfo)
        setCount(count+1)
    }

   

    // function alertReminder(focusArea){
        
        // setTimeout(alertReminder, 3000)

    async function handleTime(userInfo){
        let currentTime = moment().format('YYYY-MM-DD HH:m:s')
        if (currentTime.includes(userInfo.day_of_week && userInfo.time_of_task)){
            alert("Dont Break the Chain!") 
            console.log("Working")
        }

        if (userInfo.completed === false){
        let bool = {
            focus_area: userInfo.focus_area,
            task: userInfo.task,
            time_of_task: userInfo.time_of_task,
            day_of_week: userInfo.day_of_week,
            notes: userInfo.notes,
            completed: true};

        await axios.put(`http://127.0.0.1:8000/focus/put/${userInfo.id}/`, bool, {headers: {
            Authorization: "Bearer " + token,
          },
        })
    }
        else if(userInfo.completed === true){
            let bool = {
                focus_area: userInfo.focus_area,
                task: userInfo.task,
                time_of_task: userInfo.time_of_task,
                day_of_week: userInfo.day_of_week,
                notes: userInfo.notes,
                completed: false};
    
            await axios.put(`http://127.0.0.1:8000/focus/put/${userInfo.id}/`, bool, {headers: {
                Authorization: "Bearer " + token,
              },
            })
        }

        setCount(count + 1)

        // let response = await axios.get("http://127.0.0.1:8000/focus/get/", {
        //     headers: {
        //       Authorization: "Bearer " + token,
        //     },
        //   });

        // let target = response.filter((el) => {
        //   return el.id === userInfo.id
        // })
        

        
        
            
        // console.log(currentTime)
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
                                <td><input type="checkbox" onClick={()=> handleTime(entry)}/></td>
                                <td><button onClick={() => handleDelete(entry)}>Delete</button></td>
                                <td><button onClick={() => handleEdit(entry)}>Edit</button></td>
                                
                            </tr>
                        );
                    })}
                </table></>
                    ) : (<EditTask userInfo={edit}/>)
        } 


        
                </></>

                )
    
                
    }

export default FocusAreaTable;