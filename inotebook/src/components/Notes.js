import React,{useContext, useEffect, useRef} from 'react'
import noteContext from '../context/notes/noteContext'
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Notes() {


    
    const context =useContext(noteContext);
    const {notes,getNotes,editNote,loggedin,LoggedIn} = context;
    const navigate = useNavigate();


    useEffect(() => {

        if(loggedin){

            getNotes()
        }
        else{
           
           navigate("/login");
        }
    
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    
    const [note, setNote] = useState({etitle:"", edescription:"",etag:""})
    
    const updateNote = (currentNote) => {
        ref.current.click();
       
        setNote({id:currentNote._id,etitle: currentNote.title,edescription:currentNote.description,etag:currentNote.tag});

    }
    
    const handleClick=(e)=>{

        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        setNote({etitle:"", edescription:"",etag:""})

    }
 

    const onChange =(e)=>{

            // ... -> spread operator
        setNote({...note,[e.target.name]:e.target.value})


    }

    return (
        <>

        <Addnote/>

        {/* <!-- Button trigger modal --> */}
        <button style={{display: "none"}}ref = {ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      
        </button>

            

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="container">

                <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value ={note.etitle}  onChange={onChange} aria-describedby="emailHelp"/>
                        </div>  
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input  type="text" className="form-control" id="edescription" name="edescription" value ={note.edescription} placeholder="Description" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input  type="text" className="form-control" id="etag" name="etag" placeholder="Tag" value={note.etag} onChange={onChange}/>
                </div>
                </form>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button"  ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" disabled={note.etitle.length<5 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">Edit Note</button>
            </div>
            </div>
        </div>
        </div>


        {/* -------------------------------------------- */}
        <div className="container">
        <h1>Your Notes</h1>
        <div className="container">

            {notes.length === 0 && "No notes to display"}
        </div>

        <div className="row my-3">
        {
             
            notes.map((note) => {
                
                return <Noteitem note={note}  updateNote={updateNote} key ={note._id}/>
            })
        }
        </div>

        </div>
        </>
    )
}
