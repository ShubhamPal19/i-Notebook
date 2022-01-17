import React,{useEffect,useState,useContext} from "react";
import About from "./About";
import { Link ,  useLocation, useNavigate} from "react-router-dom";

import noteContext from '../context/notes/noteContext'
export default function Navbar() {

//  console.log("delhili "+ NoteState);
  let location = useLocation();
  const context = useContext(noteContext);

  const {loggedin,LoggedIn} = context;

  const navigate = useNavigate();
  


   useEffect(() => {

    console.log("use this effect")
    if(!loggedin){
      navigate("/login");
    }
  

},[loggedin])
  const handleLogout = ()=>{
    
    
   
    localStorage.removeItem('token');

    LoggedIn(false);

    console.log(  "fasdifo dsoifj")

  

  }
  return (
    <>


      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            i-Notebook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link  ${location.pathname==='/'? "active": ""} `} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link  ${location.pathname==='about'? "active": ""} `} style={{text:"bold"}}  to="about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?
             <div className="container">
               <Link className=" btn btn-primary mx-1 float-right" to="/login" role="button">Login</Link>
               <Link className=" btn btn-primary mx-1 float-right" to="/signup" role="button">Sign Up</Link>
             </div>
             :
                          
             <div className="container">
               <Link    onClick = { handleLogout} className=" btn btn-primary mx-1 float-right" to="/" role="button">Logout</Link>
             </div>
            }
              
          </div>
        </div>
      </nav>
    </>
  );
}
