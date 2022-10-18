import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import CreateNewTask from "../../components/CreateNewTask/CreateNewTask";


const FocusAreaTable = () => {

    const [user, token] = useAuth();
    const [focusArea, setFocusArea] = useState([]);
    // const [show, setShow] = useState([true])
    

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


    console.log(focusArea)


    async function handleDelete(del) { 
        console.log(del)
        return await axios.delete(`http://127.0.0.1:8000/focus/delete/${del.id}/`, {
            headers: {
                Authorization: "Bearer " + token,
            }, }) 
        } 

    async function handleEdit(edit) {
        console.log(edit)
        
        
    }
    

    
    return(
    <>
    <div className="container">
      <h1>Welcome Back {user.username}!</h1>
    </div>
    <><div>

      </div>
      <table className="table table-striped bg-info p-2 text-dark bg-opacity-10">
          <thead>
            <tr>
              <th scope="col">Focus Area</th>
              <th scope="col">Task</th>
              <th scope="col">Time</th>
              <th scope="col">Day</th>
              <th scope="col">Notes</th>
              {/* <th scope="col">Add New Task</th> */}
              <th scope="col">Delete New Task</th>
              <th scope="col">Edit Task</th>
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
                
                {/* <button onClick={() => setShow(false)}>Add Task</button> */}
                <button onClick={() => handleDelete(entry)}>Delete Task</button>
                <button onClick={() => handleEdit(entry)}>Edit Task</button>
              </tr>
            );
          })}
        </table></>
        {/* <CreateNewTask addNewTask={addNewTask} setShow={setShow}/> */}
        
        </>
    )
}

export default FocusAreaTable;