import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
export const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: "",confirmPassword: "",email:"",password:""})
    const context = useContext(noteContext);

    const {LoggedIn} = context;
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{

        e.preventDefault();



        const {name,email,password} = credentials
                                     
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({name,email,password}) 
         
          });

          const json = await response.json();
         
          if(json.success){
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Successfully signed In","success")
            console.log("success is here")
            LoggedIn(true);
            navigate("/");
          }

          else{
              props.showAlert(json.error,"danger")
          }
  
    }





    const onChange =(e)=>{

        // ... -> spread operator
    setCredentials({...credentials,[e.target.name]:e.target.value})
    

}
    return (
        <div className="container">
           <form   onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} placeholder="Enter name"/>
            </div>
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={credentials.email}  aria-describedby="emailHelp" onChange={onChange}  placeholder="Enter email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="form-control" id="password" credentials={credentials.password} onChange={onChange} placeholder="Password"/>
            </div>
            <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" name = "cpassword" className="form-control" id="cpassword" credentials={credentials.cpassword} onChange={onChange} placeholder="Confirm Password"/>
            </div>
            

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}
