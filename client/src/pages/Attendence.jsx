import React from "react";
import { PresentBtn, Sideimage } from "../components";
import human from "../assests/human.png";
import MyCalendar from "../components/Calender/Calender";


export default function Attendence() {
  return (
    <div className="row containe mx-aut d-flex jutify-content-center" style={{overflowX: "hidden", scrollbarWidth: "none"}}>
      <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-3 p-lg-5 mt-5">
        <div className="tittle-container text-center fs-2 fw-bold">
          Hey <span>😎</span> <br /> <em>Awesome One </em>
        </div>

        <PresentBtn />
        <p className="lead fw-bold">Check Your history <span>⏬</span></p>
        <MyCalendar />
      </div>
      <Sideimage src={human} />
    </div>
  );
}
