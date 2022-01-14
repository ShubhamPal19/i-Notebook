import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
export default function Addnote() {

    
    
    const context =useContext(noteContext);
    const {addNote} = context;


    const [note, setNote] = useState({title:"", description:"",tag:"default"})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);


    }


    const onChange =(e)=>{

            // ... -> spread operator
        setNote({...note,[e.target.name]:e.target.value})


    }
    return (
        <div className="container ">


   
   
        <h1>Add Note</h1>
        <div className="container">

         <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange} aria-describedby="emailHelp"/>
                 </div>  
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input  type="text" className="form-control" id="description" name="description" placeholder="Description" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input  type="text" className="form-control" id="tag" name="tag" placeholder="Tag" onChange={onChange}/>
            </div>
            
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
        </div>

   
    </div>
    )
}
