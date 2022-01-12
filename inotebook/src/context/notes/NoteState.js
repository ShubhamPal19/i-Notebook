import React, {useState} from "react";
import noteContext from "./noteContext";



const NoteState = (props)=>{

   
    return (
        <noteContext.Provider >
            {props.children}

        </noteContext.Provider>


    )
}

export default NoteState;