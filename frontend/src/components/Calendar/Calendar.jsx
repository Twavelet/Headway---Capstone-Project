import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css"; // needs additional webpack config!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useContext } from "react";
import { useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
// import bootstrapPlugin from '@fullcalendar/bootstrap';

const Calendar = (props) => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(props.userData);
  }, [props.userData]);

  console.log(props.userData);

  function getEvents() {
    let userEvents = props.userData.map((task) => {
      return {
        title: task.task,
        date: task.day_of_week + " " + task.time_of_task,
        color: task.color,
        textColor: "#0080FF",
      };
    });
    return userEvents;
  }
  return (
    <div>
      <ul>
        <li className="fA">
          {user ? (
            <button onClick={() => navigate("/table")}>Focus Areas</button>
          ) : null}
        </li>
        <li className="add">
          {user ? (
            <button onClick={() => navigate("/addTask")}>Add Task</button>
          ) : null}
        </li>
      </ul>
      {props.userData && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          events={getEvents()}
        />
      )}
    </div>
  );
};

export default Calendar;
