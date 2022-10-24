import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CreateNewTask = (props) => {
  const navigate = useNavigate();
  const [user, token] = useAuth();
  const [focusArea, setFocusArea] = useState([]);
  const [task, setTask] = useState([]);
  const [time, setTime] = useState([]);
  const [date, setDate] = useState([]);
  const [notes, setNotes] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      focusArea.length > 0 &&
      task.length > 0 &&
      time.length > 0 &&
      date.length > 0
    ) {
      let newTask = {
        focus_area: focusArea,
        task: task,
        time_of_task: time,
        day_of_week: date,
        notes: notes,
      };

      props.addNewTask(newTask);

      let response = await axios.post("http://127.0.0.1:8000/focus/", newTask, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate("/");
      console.log(response);
      console.log(newTask);
    } else
      alert(
        "Incomplete Entry, Please Resubmit With All of the Fields Filled Out"
      );
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid ">
      <div className="form-group">
        <label>Focus Area</label>
        <input
          placeHolder="Enter your Focus Area: "
          className="form-control"
          type="string"
          value={focusArea}
          onChange={(event) => setFocusArea(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Task</label>
        <input
          placeHolder="Enter your New Task: "
          className="form-control"
          type="string"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>time</label>
        <input
          placeHolder="Enter the Time for your New Task: "
          className="form-control"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          placeHolder="Enter the Date for your New Task: "
          className="form-control"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Notes</label>
        <input
          placeHolder="Enter Any Notes: "
          className="form-control"
          type="string"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};
export default CreateNewTask;
