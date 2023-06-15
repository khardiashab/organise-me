import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FallingLines, LineWave, InfinitySpin } from "react-loader-spinner";

import { Link, redirect } from "react-router-dom";
import human from "../assests/human.png";
import { Sideimage, Searchbar } from "../components";
import activity from "../assests/activity.png";
import logo from "../assests/addnote.png";
import { getNotes } from "../api/notes.js";
export default function Home() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNotes, setTotalNotes] = useState(undefined);
  const [totalPages, setTotalPages] = useState(undefined);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notesLoading, setNotesLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchAndCachedData = async () => {
    try {
      setNotesLoading(true);
      const fetchData = await getNotes(currentPage);
      setNotes(fetchData.notes);
      setCurrentPage(fetchData?.currentPage);
      setTotalPages(fetchData?.totalPages);
      setTotalNotes(fetchData?.totalNotes);
      setNotesLoading(false);
    } catch (error) {
      setError(error);
      setNotesLoading(false);
    }
  };
  useEffect(() => {
    fetchAndCachedData();
  }, [currentPage]);
  const handleOnClick = (e) => {
    const noteId = e.target.value;
    console.log(e.target)
    const note = notes.find((note) => note.noteId === noteId);
    console.log(noteId)
    setSelectedNote(note);
  };
   const handleCloseNote = () => {
    setSelectedNote(null);
  };
   const handleAddNotes = () => {
    history.push("/add-notes");
  };
  return (
    <div className="container row mx-auto d-flex mt-5 postion-relative">
      <div className="user mt-4 col-12 col-md-6">
        <div className="quote px-2 my-5 text-center">
          <q className="blockquote d-block p-1">
            Believe in Yourself You are writing your future.
          </q>
        </div>
        <Searchbar setSelectedNote={setSelectedNote} handleCloseNote={handleCloseNote} />
         <h3 className="text-center">Your Notes `{totalNotes}`</h3>
        {notesLoading && (
          <div className="text-center" style={{ color: "green" }}>
            <InfinitySpin strokeColor="#00BFFF" />
          </div>
        )}
         {notes.length > 0 ? (
          <>
            <div className="d-flex flex-wrap my-3 my-lg-4 align-items-space-between justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <span
                  className="mx-2 px-2 link-primary text-decoration-underline cursor-pointer fw-bold btn"
                  key={`Id_${index + 1}`}
                onClick={() => {
                    setCurrentPage(index + 1);
                }}
                >
                  {index + 1}
                </span>
              ))}
          </div>
             <div className="d-flex row  border">
              {notes.map((note) => (
                <div key={note.noteId}>
                  <div
                
                  >
                    <p
                      className="fw-bold px-2 m-1 notesBtn text-uppercase btn d-block"
                      onClick={()=>{
                        setSelectedNote(note)
                      }}
                    >
                      {note.title}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          </>
        ) : (
          <div className="d-flex flex-column py-3 align-items-center text-center">
            <h2 className="text-muted">No notes available</h2>
            <button className="btn btn-primary" onClick={handleAddNotes}>
              Add notes
            </button>
          </div>
        )}
        {selectedNote && (
          <ImageContainer
            note={selectedNote}
            handleCloseNote={handleCloseNote}
          />
        )}
      </div>
      {/* side image */}
      <Sideimage src={human} />
    </div>
  );
}
function ImageContainer({ note, handleCloseNote }) {
  return (
    <div
      className="d-flex flex-column imageContainer modal"
      style={{ minHeight: "100vh", width: "100vw", overflowX: "hidden" }}
    >
      <button
        className="text-right text-white bg-white btn-close p-3 my-3 mx-3"
        onClick={handleCloseNote}
      ></button>
      <img
        src={note.photoUrl}
        alt=""
        className="w-100"
        style={{ objectFit: "contain", height: "auto" , overflowY:"scroll"}}
      />
    </div>
  );
}