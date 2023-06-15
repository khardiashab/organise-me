import React, { useState, useEffect } from "react";
import InputTask from "./InputTask.jsx";
import { getTodayList, updateTask, deleteTask, addTask} from "../api/tasks.js";

const listStyle = {
  color: "rgba(255,255,255,.7)",
  fontSize: "1.1rem"
};

function Task({ task, DelClick, DoneClick }) {
  const [isDone, setDone] = useState(task.done);
  function onChangeHandler(e) {
    setDone((val) => {
      if (val) {
        return val;
      } else {
        DoneClick(e);
        return true;
      }
    });
  }
  return (
    <div className="row col-10 mx-auto text-capitalize my-2" style={listStyle}>
      <div className="col-9 shadow-lg pt-1">
        <input
          type="checkbox"
          className="form-check-input"
          onChange={onChangeHandler}
          checked={task.done}
          value={task._id}
        />
        <span
          className="ms-2 ms-md-4"
          style={
            isDone
              ? {
                  textDecoration: "line-through",
                  color: "#A0C3D2"
                }
              : {
                  color: "gray"
                }
          }
        >
          {task.name}
        </span>
      </div>
      <DelButton DelClick={DelClick} _id={task._id} />
    </div>
  );
}
function DelButton({ _id, DelClick }) {
  return (
    <button
      className="btn btn-warning btn-sm col-2 ms-auto"
      value={_id}
      onClick={DelClick}
    >
      Del
    </button>
  );
}
export default function TaskList() 
{
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)
  const refreshTasks = async()=>{
    const fetchData = await getTodayList()
    setTasks(fetchData.data)
  }
  const fetchAndCachedData = async ()=>{
    try{
       {
        refreshTasks()
      }
    } catch (error){
      setError(error)
    }
  }
  function DelClick(e) {
    const task = tasks.filter((item) =>{
      return item._id === e.target.value;
    })
    console.log("Del click => : ", task)
    if(task[0].done === true){
      return ;
    } else {
       taskUpdation(e, deleteTask)
      }
    }
function taskUpdation(event, fn){
  try {
    (async()=>{
      await fn(event.target.value)
      await refreshTasks() 
    })()
  } catch (error) {
    setError(error)
  }
}
  function DoneClick (e){
    const task = tasks.filter((item) =>{
      return item._id === e.target.value;
    })
    if(task.done === true){
      return ;
    } else {
      taskUpdation(e, updateTask )
  }
}
  function AddTaskClick(e){
    if(e.target.value.length > 3){
      taskUpdation(e, addTask)
    } else {
      return false;
    }
  }
  useEffect(() => {
    fetchAndCachedData()
  }, [])
  return (
    <>
      <InputTask  btnClick={refreshTasks} />
      <div className="row my-4 ">{
        tasks?.length > 0 ?(
          tasks?.map((val) => {
            return (
              <Task
              task={val}
              key={val._id}
              DelClick={DelClick}
              DoneClick={DoneClick}
            />
          );
        })
          ) : (
            <p className="lead">Your task list is empty add task.</p>
          )    
      }
      </div>
    </>
  );
}