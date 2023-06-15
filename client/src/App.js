import "./styles.css";
import { Navigate, Route, Routes, redirect } from "react-router-dom";
import { Navbar, Footer } from "./components";
import Home from "./pages/Home";
import ListContainer from "./pages/ListContainer";
import Attendence from "./pages/Attendence";
import AddNotes from "./pages/Addnotes";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import Addnotes from "./pages/Addnotes";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'))

  useEffect(()=>{
    setIsAuthenticated(!!localStorage.getItem('authToken'))
  }, [])

  return (
    <div className="container-fluid p-0 m-0 d-flex flex-column vh-100">

      {!!isAuthenticated && (
        <Navbar />

      )}
      <Routes >

        <Route path="/login"
          element={!!isAuthenticated ?  <Navigate replace to={"/"} /> : <Login />}
        />
        <Route path="/"
          element={!isAuthenticated ? <Navigate replace to={"/login"} /> : <Home />}
        />
        <Route path="/attendence"
          element={!isAuthenticated ? <Navigate replace to={"/login"} /> : <Attendence />}
        />
        <Route path="/add-notes"
          element={!isAuthenticated ? <Navigate replace to={"/login"} /> : <AddNotes />}
        />
        <Route path="/todolist"
          element={!isAuthenticated ? <Navigate replace to={"/login"} /> : <ListContainer />}
        />

      </Routes>
      <Footer />

    </div>
  );
}
