import React,{useState} from 'react'
import authContext from "./authContext";

const authState=(props) =>{




    const [loggedin, setLoggedin] = useState(false)

    const LoggedIn=(value)=>{

        setLoggedin(value);
        

    }

    return (
        
            <authContext.Provider value =  {{loggedin,LoggedIn}}>
                {props.children}
            </authContext.Provider>
    
    
        )
}


    export default authState;


// import React, {useState} from "react";
// import authContext from "./authContext";



// const authState = (props)=>{
   

//     const [loggedin, setLoggedin] = useState(false)

    
//     const LoggedIn=(value)=>{

//         setLoggedin(value);
        

//     }
//     return (
//         <authContext.Provider value =  {{loggedin,LoggedIn}}>
//             {props.children}
//         </authContext.Provider>


//     )
// }


// export default authState ;





