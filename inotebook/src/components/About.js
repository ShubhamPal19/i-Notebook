import React,{useContext} from 'react'
import NoteContext from '../context/notes/noteContext'
import {useEffect} from 'react'
export default function About() {



    
    const a=useContext(NoteContext)




    // },[])
    return (
        <div>
            this is about page
        </div>
    )
}
