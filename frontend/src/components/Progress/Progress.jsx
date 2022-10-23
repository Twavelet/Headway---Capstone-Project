import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import ProgressGraph from '../ProgressGraph/ProgressGraph';



const Progress = (props) => {

    const [progress, setProgress] = useState([])
    const [showGraph, setShowGraph] = useState([true])
    const [date, setDate] = useState([])
    const [user, token] = useAuth();

   

    async function handleSubmit(event){
        event.preventDefault();
        if (progress.length > 0 ){
        let newProgress = {
            focus_area_id: props.userProgress.id,
            measurement_of_progress: progress,
            date: date,
            focus_area: {
                id: props.userProgress.id,
                focus_area: props.userProgress.focus_area,
                task: props.userProgress.task,
                time_of_task: props.userProgress.time_of_task,
                day_of_week: props.userProgress.day_of_week,
                notes: props.userProgress.notes,
                completed: props.userProgress.completed,
                color: props.userProgress.color,
                user: props.userProgress.user
            }
        }
        console.log(newProgress)
        
        props.addNewProgress(newProgress)
       
        

        let response = await axios.post('http://127.0.0.1:8000/progress/post/', newProgress, {headers: {
            Authorization: "Bearer " + token,
          },
        }) && props.setParentCount(props.parentCount + 1)
        setShowGraph(false)
        console.log(response)
    }
}
    



 return(
    <><>
    {showGraph ? (<form onSubmit={handleSubmit} className="form-grid bg-info p-2 text-dark bg-opacity-10">
    <div className='form-group'>
        <label>Progress</label>
        <input placeHolder='Enter your progress: ' className='form-control' type='integer' value ={progress} onChange={(event) => setProgress(event.target.value)}/>
    </div>
    <div className='form-group'>
        <label>Date</label>
        <input placeHolder='Enter the Date: ' className='form-control' type='date' value={date} onChange={(event) => setDate(event.target.value)}/>
    </div>
    <div>
        <button type='submit' className='btn btn-primary'>Submit</button>
    </div>
</form>) : <ProgressGraph parentProgress = {props.parentProgress} userProgress = {props.userProgress}/>}
</></>
        )
   
 }


export default Progress;