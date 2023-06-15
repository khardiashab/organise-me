import React, { useState } from "react";
import { addTask } from "../api/tasks";
 // InputTask component takes a prop called btnClick
// which is a function to be called when the Add button is clicked
export default function InputTask({ btnClick }) {
  // Initialize state for the input text
  const [text, setText] = useState("");
   // Handle onClick event for the Add button
  const handleOnClick = async (e) => {
    // Check if the input text is at least 3 characters long
    if (text.length > 2) {
      try {
        // Call the addTask function from the tasks API
        const response = await addTask(text);
        // Call the btnClick function passed as a prop
        await btnClick();
        // Clear the input text
        setText("");
      } catch (error) {
        // Handle any errors from the addTask function
      }
    }
  };
   // Render the input and Add button
  return (
    <div className="row col-12 mx-auto my-3">
      <div className="col-9">
        <input
          type="text"
          className="form-control"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button className="btn btn-info col-3" value={text} onClick={handleOnClick}>
        Add
      </button>
    </div>
  );
}