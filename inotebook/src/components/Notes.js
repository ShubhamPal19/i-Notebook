import React,{useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
import Addnote from './Addnote';
import Noteitem from './Noteitem';

export default function Notes() {


    
    const context =useContext(noteContext);
    const {notes,getNotes} = context;

    useEffect(() => {
        getNotes()
    
    }, [])
    
    return (
        <>

        <Addnote/>
        <div className="container">
        <h1>Your Notes</h1>

        <div className="row my-3">
        {
            
            notes.map((note) => {
                
                return <Noteitem note={note} key ={note._id}/>
            })
        }
        </div>

        </div>
        </>
    )
}
