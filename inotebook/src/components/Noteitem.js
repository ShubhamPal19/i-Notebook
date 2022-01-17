import React,{useContext} from "react";

import noteContext from '../context/notes/noteContext'
export default function Noteitem(props) {


  const context = useContext(noteContext);
  const {deleteNote} =context;

  const { note ,updateNote } = props;


 
  return (
    <div className = " col md-3">
      <div className="my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
           {note.description}
          </p>

          <div className="container ">
            <i className="far fa-trash-alt mx-2 flex-nowrap" onClick={()=>{deleteNote(note._id);}}></i>

           <i className="far fa-edit mx-2 flex-nowrap" onClick={()=>{updateNote(note);}}></i>
          </div>
         
        </div>
      </div>
    </div>
  );
}
