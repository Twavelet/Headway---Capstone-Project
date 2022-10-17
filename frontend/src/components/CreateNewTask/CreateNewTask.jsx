import React, { useState } from 'react';
import axios from 'axios'
import useAuth from "../../hooks/useAuth";


const CreateNewTask = (props) => {

    const [user, token] = useAuth()
    const [focusArea, setFocusArea] = useState([])
    const [task, setTask] = useState([])
    const [time, setTime] = useState([])
    const [date, setDate] = useState([])

    async function handleSubmit(event){
        event.preventDefault();
        
        let newTask = {
            focus_area: focusArea,
            task: task,
            time_of_task: time,
            day_of_week: date,
            
        }
        props.addNewTask(newTask)

        let response = await axios.post('http://127.0.0.1:8000/focus/', newTask, {headers: {
            Authorization: "Bearer " + token,
          },
        })
        
        console.log(response)
        console.log(newTask)
    }

        return(
            <form onSubmit={handleSubmit} className="form-grid bg-info p-2 text-dark bg-opacity-10">
                <div className='form-group'>
                    <label>Focus Area</label>
                    <input placeholder='Enter your Focus Area:' className='form-control' type='string' value={focusArea} onChange={(event) => setFocusArea(event.target.value)}/>
                </div>
                <div className='form-group'>
                    <label>Task</label>
                    <input placeholder='Enter your New Task:' className='form-control' type='string' value={task} onChange={(event) => setTask(event.target.value)}/>
                </div>
                <div className='form-group'>
                    <label>time</label>
                    <input placeholder='Enter the Time for your New Task:' className='form-control' type='time' value={time} onChange={(event) => setTime(event.target.value)}/>
                </div>
                <div className='form-group'>
                    <label>Date</label>
                    <input placeholder='Enter the Date for your New Task:' className='form-control' type='date' value={date} onChange={(event) => setDate(event.target.value)}/>
                </div>
                <div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </form>
        )

}
export default CreateNewTask;