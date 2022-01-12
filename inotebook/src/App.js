import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="conta">

          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>


          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
