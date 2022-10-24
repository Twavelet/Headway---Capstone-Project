import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const EditTask = (props) => {
  const [user, token] = useAuth();
  const [focusArea, setFocusArea] = useState([]);
  const [task, setTask] = useState([]);
  const [time, setTime] = useState([]);
  const [date, setDate] = useState([]);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      focusArea.length > 0 &&
      task.length > 0 &&
      time.length > 0 &&
      date.length > 0
    ) {
      let editedTask = {
        focus_area: focusArea,
        task: task,
        time_of_task: time,
        day_of_week: date,
        notes: notes,
      };

      let response = await axios.put(
        `http://127.0.0.1:8000/focus/put/${props.userInfo.id}/`,
        editedTask,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(response);
      console.log(editedTask);

      navigate("/");
    } else
      alert(
        "Incomplete Entry, Please Resubmit With All of the Fields Filled Out"
      );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-grid ">
        <div className="form-group">
          <label>Focus Area</label>
          <input
            defaultValue={props.userInfo.focus_area}
            className="form-control"
            type="string"
            onChange={(event) => setFocusArea(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Task</label>
          <input
            defaultValue={props.userInfo.task}
            className="form-control"
            type="string"
            onChange={(event) => setTask(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>time</label>
          <input
            defaultValue={props.userInfo.time_of_task}
            className="form-control"
            type="time"
            onChange={(event) => setTime(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            defaultValue={props.userInfo.day_of_week}
            className="form-control"
            type="date"
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Notes</label>
          <input
            defaultValue={props.userInfo.notes}
            className="form-control"
            type="string"
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
