import React from 'react'
import Addnote from './Addnote'
import Notes from "./Notes"


export default function Home(props) {

    return (

        <div> 
            <Notes showAlert={props.showAlert}/>   
        </div>
    )
}
