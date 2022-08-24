import { useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom";

function Signup() {
  const [credentials, setcredentials] =useState({name:"",email:"",password:"",cpassword:""});
  let navigate = useNavigate();
 
  const handleSubmit=async(e)=>{
e.preventDefault();
      const {name,email,password} =credentials;
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({name,email,password})
       
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
          //redrict to the login page 
          localStorage.setItem('token',json.authtoken);

          navigate("/", { replace: true });
          alert("You are successfully loged in")
        }
        else{
          alert("please inter valid credentials")
        }

  }

  const onChange=(e)=>{
  
      setcredentials({...credentials,[e.target.name]: e.target.value})
}
  return (
    <div className="container my-3 border border-success border border-3">
     <form onSubmit={handleSubmit} className="container my-3">
     <div className="form-group">
    <label htmlFor="exampleInputEmail"style={{fontSize:"20px"}} className="text-center text-success"> Name</label>
    <input type="text" name="name" className="form-control" id="name" onChange={onChange}aria-describedby="name" placeholder="Enter name"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1" className="text-center my-3 text-success" style={{fontSize:"20px"}}>Email address</label>
    <input type="email" style={{fontSize:"20px"}} name ="email" className="form-control" onChange={onChange}id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted text-center">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1 text-center" style={{fontSize:"20px"}} className="text-center my-3 text-success">Password</label>
    <input type="password"   name="password" className="form-control" onChange={onChange}  minLength={5} required  id="password" placeholder="Password"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1" className="text-center my-3 text-success" style={{fontSize:"20px"}}>Conferm Password</label>
    <input type="password"   className="form-control" name="cpassword" onChange={onChange} minLength={5} required id="exampleInputcPassword1" placeholder="Password"/>
  </div>
  <div className="container text-center my-3">
  <button type="submit" className="btn btn-primary bg-success" style={{fontSize:"20px"}}>Submit</button>
  </div>
</form>


    </div>
  )
}

export default Signup
