import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <>
      <h1>this is app</h1>
     
    

      <Router>
        <Navbar/>

        <Routes>
          <Route  path="/about" element={<About />} />

          <Route index path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
