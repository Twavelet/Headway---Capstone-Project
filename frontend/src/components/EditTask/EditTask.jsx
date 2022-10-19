import React, { useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";


const EditTask = (props) => {
    let edit = props.edit
    console.log(edit)

        const [user, token] = useAuth()
        const [focusArea, setFocusArea] = useState([])
        const [task, setTask] = useState([])
        const [time, setTime] = useState([])
        const [date, setDate] = useState([])
        const [notes, setNotes] = useState([])

        async function handleSubmit(event){
            event.preventDefault();
            if (focusArea.length > 0 && task.length > 0  && time.length > 0  && date.length > 0 ){
            let editedTask = {
                focus_area: focusArea,
                task: task,
                time_of_task: time,
                day_of_week: date,
                notes: notes
                
            }
            
            

            
            
            
    
            let response = await axios.put(`http://127.0.0.1:8000/focus/put/${edit.id}/`, editedTask, {headers: {
                Authorization: "Bearer " + token,
              },
            })
            
            console.log(response)
            console.log(editedTask)
            console.log(edit)
        }
        else(
            alert("Incomplete Entry, Please Resubmit With All of the Fields Filled Out")
        )
        }
        
        

        return (
            <div>
                    <form onSubmit={handleSubmit} className="form-grid bg-info p-2 text-dark bg-opacity-10">
            <div className='form-group'>
                <label>Focus Area</label>
                <input placeholder={edit.focus_area} className='form-control' type='string' value={focusArea} onChange={(event) => setFocusArea(event.target.value)}/>
            </div>
            <div className='form-group'>
                <label>Task</label>
                <input placeholder={edit.task} className='form-control' type='string' value={task} onChange={(event) => setTask(event.target.value)}/>
            </div>
            <div className='form-group'>
                <label>time</label>
                <input placeholder={edit.time_of_task} className='form-control' type='time' value={time} onChange={(event) => setTime(event.target.value)}/>
            </div>
            <div className='form-group'>
                <label>Date</label>
                <input placeholder={edit.day_of_week} className='form-control' type='date' value={date} onChange={(event) => setDate(event.target.value)}/>
            </div>
            <div className='form-group'>
                <label>Notes</label>
                <input placeholder={edit.notes} className='form-control' type='string' value={notes} onChange={(event) => setNotes(event.target.value)}/>
            </div>
            <div>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </div>
        </form>
                
            
            </div>
        )

}

export default EditTask;