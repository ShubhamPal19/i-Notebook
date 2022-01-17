import React, {useState} from "react";
import noteContext from "./noteContext";



const NoteState = (props)=>{
 

  const [loggedin, setLoggedin] = useState(false);

    
  const LoggedIn=(value)=>{

      setLoggedin(value);
      

  }
    const host = "http://localhost:5000"

    const notesInitial =[]
   

    const [notes, setNotes] = useState(notesInitial)

    const getNotes =  async ()=>{




        
      // Api call to fetch all notes
      
      console.log("fetching note s" + localStorage.getItem('token'))

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'auth-token': localStorage.getItem('token')
        },
      
      });


      const json = await response.json();
      console.log(json);
      setNotes(json);

    };







    // add a note to the
      const addNote =  async (title,description,tag)=>{




        
          // Api call
          

          const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) 
          });

          const note = await response.json();
          setNotes(notes.concat(note))
         



       
      }
    // delete a note 
    

    const deleteNote = async (id)=>{

      
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
           'auth-token': localStorage.getItem('token')
        } 
      });
      const josn = response.json();

      console.log("Deleting the nte with id" + id)
      const newNotes =notes.filter((note)=>{
        return note._id!==id
      })

      setNotes(newNotes)
        
    }
    /// edit a note
    
     const editNote = async (id,title,description,tag)=>{



          // Api call
          

          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
               'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}) 
          });
          const json=  await response.json(); 

          console.log(json);


            let newNotes = JSON.parse(JSON.stringify(notes));

          // editing note
          for(let index =0; index < notes.length; index++){
            const element = notes[index];
            if(element._id===id){
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;
            }
          }
          setNotes(newNotes);
    
            
        }


 
    

    return (
        <noteContext.Provider value =  {{loggedin,LoggedIn,notes,addNote,deleteNote,getNotes,editNote}}>
            {props.children}
        </noteContext.Provider>


    )
}


export default NoteState;







