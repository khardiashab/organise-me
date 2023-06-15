import React, { useState } from "react";
import { Sideimage, InputTask, Tasklist } from "../components";

import activity from "../assests/activity.png";

export default function ListContainer(props) {
  return (
    <div className=" container row mx-auto border">
      <div className="col-12 col-md-6 col-lg-6  px-2 px-md-5 mt-5 border">
        <h1
          className="fs-2  text-center shadow-lg py-2 mb-5 text-capitalize"
          style={{ backgroundColor: "#EAC7C7", color: "#A0C3D2" }}
        >
          todays Plan
        </h1>
        <Tasklist />
      </div>

      <Sideimage src={activity} />
    </div>
  );
}
