import { Chart } from "react-google-charts";
import React, { useState } from "react";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProgressGraph = (props) => {
  const [filteredData, setFilteredData] = useState([]);
  const [user, token] = useAuth();
  // props.progress == all of user's progress entries
  const navigate = useNavigate()

  useEffect(() => {
    console.log(props.parentProgress);
    console.log(props.parentProgress[0].focus_area.user);
    console.log(props.userProgress);
    console.log(props.userProgress.user.id);
    //Line 17 returns user_id for onClicked event

    let userData = props.parentProgress.filter((el) => {
      if (
        el.focus_area.user === props.userProgress.user.id &&
        el.focus_area.focus_area === props.userProgress.focus_area
      ) {
        return true;
      }
    });
    let userMap = userData.map((el) => {
      return [el.date, el.measurement_of_progress];
    });

    console.log(userData);
    console.log(userMap);

    setFilteredData([["Date", "Progress"], ...userMap]);
  }, []);

  let options = {
    chart: {
      title: "Progress Display",
    },
  };
  console.log(filteredData);

  return (
    <div>
          <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={filteredData}
              options={options} />
      </div>
            
  );
};

export default ProgressGraph;
