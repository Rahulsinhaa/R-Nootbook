import React,{useState,useContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import NoteContext from '../Context/notes/notesContesxt';


function Login() {
  const context = useContext(NoteContext)
  const {rahul,setrk}=context;
   const [credentials, setcredentials] =useState({email:"",password:""});
    let navigate = useNavigate();
  
      const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.passowrd})
         
          });
          const json = await response.json();
        //   console.log(json)
          if(json.success){
            //redrict to the login page 
          localStorage.setItem('token',json.authtoken)
          //-------------------------------------------------------------------------------------

          //--------------------------------------------------------------------------
          const a=localStorage.getItem('token',json.authtoken)
                
          localStorage.setItem('token2',a)
           
                navigate("/", { replace: true })
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
        
        <div>
            
            <form onSubmit={handleSubmit} className="container my-3 border border-success border border-3" >
                <div className="form-group  my-3 " >
                    <label htmlFor="exampleInputEmail1" className=' my-3 text-success' style={{fontSize:"20px"}}>Email address</label>
                    <input type="email" name="email" className="form-control" id="example" onChange={onChange} vlaue={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="email"  className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group  my-3">
                    <label htmlFor="exampleInputPassword1 " style={{fontSize:"20px"}} className=' my-3 text-success'>Password</label>
                    <input type="password" name="passowrd" onChange={onChange} vlaue={credentials.password}className="form-control" id="password1" placeholder="Password" />
                </div>
                <div className='text-center'>
                <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login
