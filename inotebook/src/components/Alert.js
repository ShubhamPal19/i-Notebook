import React from 'react'

export default function Alert(props) {
   

    

    const capitalized = (word)=> {
        word = word.toLowerCase();
        return word.charAt(0).toUpperCase() +word.slice(1);
    
    }
    
    return (

        <div style={{height: '50px'}} >
      { (props.alert) &&
      

      <div style={{color: "red" , transitions: " all 20s" }}>
           <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>Alert</strong>  :{props.alert.message}
           
            </div>
        </div>}

        </div> 
       


    )
}
