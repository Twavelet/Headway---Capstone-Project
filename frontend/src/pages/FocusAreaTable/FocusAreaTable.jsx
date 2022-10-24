import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
// import CreateNewTask from "../../components/CreateNewTask/CreateNewTask";
import EditTask from "../../components/EditTask/EditTask";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Progress from "../../components/Progress/Progress";

const FocusAreaTable = (props) => {
  const [user, token] = useAuth();
  const [focusArea, setFocusArea] = useState([]);
  const [count, setCount] = useState([]);
  const [show, setShow] = useState([true]);
  const [edit, setEdit] = useState([]);
  const [showProgress, setShowProgress] = useState([true]);
  const [progress, setProgress] = useState([]);
  const [randomQuote, setRandomQuote] = useState([
    [
      {
        text: "Life is change. Growth is optional. Choose wisely.",
        author: "Karen Clark",
      },
    ],
  ]);
  const [number, setNumber] = useState([0]);
  const [check, setCheck] = useState([false]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFocusArea() && alertReminder(props.focusArea) && getRandomQuote();
  }, [token, count]);

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

  async function getRandomQuote() {
    try {
      const response = await axios.get("https://type.fit/api/quotes");
      setRandomQuote(response.data);
      const quote = Math.floor(Math.random() * 1644);
      setNumber(quote);
      props.setParentCount(props.count + 1);
      setCount(count + 1);
    } catch (error) {
      console.log(error.response);
    }
  }

  function alertReminder(alert) {
    let currentTime = moment().format("YYYY-MM-DD HH:m:s");
    let findFalse = alert.filter((el) => {
      return el.completed === false;
    });
    let reminder = findFalse.filter((ele) => {
      if (currentTime.includes(ele.day_of_week && ele.time_of_task)) {
        alert("Dont Break the Chain!");
        console.log("Working");

        return reminder;
      }
    });
  }

  //   ;

  console.log(focusArea);

  async function handleDelete(del) {
    console.log(del);
    await axios.delete(`http://127.0.0.1:8000/focus/delete/${del.id}/`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setCount(count + 1);
    props.setParentCount(count + 1);
    return navigate("/");
  }

  function handleEdit(userInfo) {
    console.log(userInfo);
    setShow(false);
    setProgress(true);
    setEdit(userInfo);
    setCount(count + 1);
    props.setParentCount(count + 1);
  }

  function handleProgress(userInfo) {
    console.log(userInfo);
    setShowProgress(false);
    setShow(true);
    setProgress(userInfo);
    setCount(count + 1);
    props.setParentCount(count + 1);
    console.log(props.parentProgress);
  }

  async function handleTime(userInfo) {
    let currentTime = moment().format("YYYY-MM-DD HH:m:s");

    if (currentTime.includes(userInfo.day_of_week && userInfo.time_of_task)) {
      alert("Dont Break the Chain!");
      console.log("Working");
    }

    if (userInfo.completed === false) {
      let boolChange = {
        focus_area: userInfo.focus_area,
        task: userInfo.task,
        time_of_task: userInfo.time_of_task,
        day_of_week: userInfo.day_of_week,
        notes: userInfo.notes,
        completed: true,
        color: "green",
      };

      await axios.put(
        `http://127.0.0.1:8000/focus/put/${userInfo.id}/`,
        boolChange,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } else if (userInfo.completed === true) {
      let boolChange = {
        focus_area: userInfo.focus_area,
        task: userInfo.task,
        time_of_task: userInfo.time_of_task,
        day_of_week: userInfo.day_of_week,
        notes: userInfo.notes,
        completed: false,
        color: "red",
      };

      await axios.put(
        `http://127.0.0.1:8000/focus/put/${userInfo.id}/`,
        boolChange,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    }

    setCount(count + 1);
    props.setParentCount(count + 1);
    navigate("/");
  }

//   function handleCheck(userCheck) {
//     if (userCheck.completed === false) {
//       setCheck(true);
//     } else if (userCheck.completed === true) {
//       setCheck(false);
//     }
//   }

  return (
    <>
      <>
        {show && showProgress ? (
          <>
            <div className="container">
              <h1>Welcome Back {user.username}!</h1>
            </div>
            <div>
              <h2 className="quote">{randomQuote[number].text}</h2>
              <h3 className="author">{randomQuote[number].author}</h3>
            </div>
            <table className="table table-striped bg-info p-2 text-dark bg-opacity-10">
              <thead>
                <tr>
                  <th scope="col">Focus Area</th>
                  <th scope="col">Task</th>
                  <th scope="col">Time</th>
                  <th scope="col">Day</th>
                  <th scope="col">Notes</th>
                  <th scope="col">Completion</th>
                  <th scope="col">Progress</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Edit</th>
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
                    <td>
                      <input
                        type="checkbox"
                        defaultChecked={entry.completed}
                        onClick={() => handleTime(entry)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleProgress(entry)}>
                        Add Progress
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(entry)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(entry)}>Edit</button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </>
        ) : !show && progress ? (
          <EditTask userInfo={edit} />
        ) : show && !showProgress ? (
          <Progress
            addNewProgress={props.addNewProgress}
            parentProgress={props.parentProgress}
            parentCount={props.parentCount}
            setParentCount={props.setParentCount}
            userProgress={progress}
          />
        ) : null}
      </>
    </>
  );
};

export default FocusAreaTable;
