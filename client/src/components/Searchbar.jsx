import React, { useState, useEffect, useRef } from "react";
import { searchNotes } from "../api/notes.js";
export default function Searchbar({ setSelectedNote, handleCloseNote }) {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const inputRef = useRef(null);
  async function searchNotesApiCalling() {
    try {
      const response = await searchNotes(search);
      setSearchList(response.data);
    } catch (error) {
      console.error("Error searching notes:", error);
    }
  }
  const handleOnClick = async (event) => {
    if (search.length > 0) {
      inputRef.current.classList.remove("border-danger");
      await searchNotesApiCalling();
    } else {
      inputRef.current.classList.add("border-danger");
      inputRef.current.setAttribute("placeholder", "Enter Search Term");
    }
  };
  useEffect(() => {
    const fn = () => {
      if (search.length > 0) {
        searchNotesApiCalling()
      }
    }
    fn()
  }, [search]);
  return (
    <>
      <div className="d-flex m-1 m-lg-3 border-danger position-relative">
        <input
          id="searchbar__notes"
          type="text"
          className="form-control w-70"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search Notes"
          ref={inputRef}
        />
        <div className="btn btn-sm btn-primary w-25" onClick={handleOnClick}>
          Search
        </div>
        {search.length > 0 && (
          <>
            <ul className="search-results notes-ul">
              {searchNotes.length > 0 ? (
                <>
                  {searchList.map((item) => (
                    <span className="border-bottom d-block text-primary  my-1 pointer-cursor text-decoration=underline text-capitalize fw-bold" key={item.notes.noteId}
                      onClick={() => {
                        console.log(item.notes)
                        setSelectedNote(item.notes)
                      }}

                    >{item.notes.title}</span>
                  ))}
                </>
              ) : (
                <>
                <span className="border-bottom d-block text-primary  my-1 pointer-cursor text-decoration=underline text-capitalize fw-bold" 
                    >Not available</span>
                </>
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
}