import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const Calendar = (props) => {

    // props.userData
    console.log(props.userData)
return (
    <div>
    <FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth"
    events={[
        // have to figure out how to map over the data -- not sure if i can do it inside of the instantiation of the FullCalendar
        { title: props.userData[0].task, date: props.userData[0].day_of_week},
        { title: 'event 2', date: '2019-04-02' }
      ]}/>
    
    </div>
    

)
}

export default Calendar;