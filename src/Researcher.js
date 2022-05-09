import React, { useState, useEffect } from "react";
import Leftbar from "./Components/Leftbar";
import RCbutton from "./Components/RCbutton";
import axios from "axios";

const getParamsId = () => {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  return params.get("user_idcard");
};

const id = getParamsId();

const apiUrl = "https://api.rmuti.ac.th/km_api";

function Researcher(props) {
  // const [locationRe, Setdatamap] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/api/get/us-project/locations/3309901756539")
  //     .then((locationRe) => {
  //       Setdatamap(locationRe.data);
  //     });
  // }, []);

  return (
    <div>
      <Leftbar />
      <RCbutton  />

    
    </div>
  );
}

export default Researcher;
