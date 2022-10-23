import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';



const Progress = (props) => {

    const [progress, setProgress] = useState([])
    const [showGraph, setShowGraph] = useState([true])
    
    const [user, token] = useAuth();

   

    async function handleSubmit(event){
        event.preventDefault();
        if (progress.length > 0 ){

        let newProgress = {
            focus_area_id: props.progress.id,
            measurement_of_progress: progress
        }
        console.log(newProgress)
        
        props.addNewProgress(newProgress)
       
        

        let response = await axios.post('http://127.0.0.1:8000/progress/post/', newProgress, {headers: {
            Authorization: "Bearer " + token,
          },
        })
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
    <div>
        <button type='submit' className='btn btn-primary'>Submit</button>
    </div>
</form>) : null}
</></>
        )
   
 }


export default Progress;