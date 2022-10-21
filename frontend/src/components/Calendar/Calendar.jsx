import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useEffect } from 'react'

const Calendar = (props) => {

    useEffect(()=>{
        console.log(props.userData)
    }, [props.userData])

    console.log(props.userData)
    

    function getEvents(){
        let userEvents = props.userData.map((task) =>{
            return {
                title: task.task,
                date: task.day_of_week +" " + task.time_of_task
                
            }
        })
        return userEvents

    }
return (
    <div>
   {props.userData && (
    <FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth"
    events={getEvents()}
      />
   )}
    </div>
   

)
}

export default Calendar;