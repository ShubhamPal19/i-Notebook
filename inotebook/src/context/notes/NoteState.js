import React, {useState} from "react";
import noteContext from "./noteContext";



const NoteState = (props)=>{
    const host = "http://localhost:5000"

    const notesInitial =[]
   

    const [notes, setNotes] = useState(notesInitial)

    const getNotes =  async ()=>{




        
      // Api call to fetch all notes
      

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkYTljZjRjOGE0NzNiMzhhZDQyNjMzIn0sImlhdCI6MTY0MTcyNjQ1MH0.61mETRq7Q6WEUe_wvtAr2cOPdS7MFi2rbYYd-PjrQFk"
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
               'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkYTljZjRjOGE0NzNiMzhhZDQyNjMzIn0sImlhdCI6MTY0MTcyNjQ1MH0.61mETRq7Q6WEUe_wvtAr2cOPdS7MFi2rbYYd-PjrQFk"
            },
            body: JSON.stringify({title,description,tag}) 
          });
         



        console.log("adding a noe noate")
        // todo api call
       const note = {
          "_id": "261dbaef93e6e4e312e5714btewd",
          "user": "61da9cf4c8a473b38ad42633",
          "title": title,
          "description": description,
                 "tag": tag,
          "date": "2022-01-10T03:58:49.451Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }
    // delete a note 
    

    const deleteNote = async (id)=>{

      
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
           'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkYTljZjRjOGE0NzNiMzhhZDQyNjMzIn0sImlhdCI6MTY0MTcyNjQ1MH0.61mETRq7Q6WEUe_wvtAr2cOPdS7MFi2rbYYd-PjrQFk"
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
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkYTljZjRjOGE0NzNiMzhhZDQyNjMzIn0sImlhdCI6MTY0MTcyNjQ1MH0.61mETRq7Q6WEUe_wvtAr2cOPdS7MFi2rbYYd-PjrQFk"
            },
            body: JSON.stringify({title,description,tag}) 
          });
          const json= response.json(); 






          // editing note
          for(let index =0; index < notes.length; index++){
            const element = notes[index];
            if(element._id===id){
              element.title = title;
              element.description = description;
              element.tag = tag;
            }
          }
    
            
        }

    return (
        <noteContext.Provider value =  {{notes,addNote,deleteNote,getNotes}}>
            {props.children}
        </noteContext.Provider>


    )
}


export default NoteState;







