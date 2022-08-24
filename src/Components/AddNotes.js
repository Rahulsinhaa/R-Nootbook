import React, { useState } from 'react';
import noteContext from '../Context/notes/notesContesxt';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

function AddNotes() {
    const context =useContext(noteContext);
    let navigate = useNavigate();

    const {addNote}=context;

    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
      if (localStorage.getItem("token") === null) {
        navigate("/Login",{replace:true});
        alert("please login first");

        }
        e.preventDefault();
        addNote(note.title,note.description,note.tag);

    }

    const onChange=(e)=>{
        
          setNote({...note,[e.target.name]: e.target.value})
    }
  return (
   <>
    <div className="conatin er my-3 border border-success border border-3 text-light">
    <h2 className='text-center bg-success' >Add your note</h2>
    
    <form className="mb-3  mx-3 text-success" style={{fontSize:"20px"}}>
    <div  className="mb-3  ">
      <label htmlFor="title" className="form-label ">Title</label>
      <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" onChange={onChange}/>
      <div id="emailHelp" className="form-text">.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="desc" className="form-label">Description</label>
      <input type="text" className="form-control" id="description" name ="description" onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="tag" className="form-label">Tag</label>
      <input type="text" className="form-control" id="tag" name ="tag" onChange={onChange}/>
    </div>
    <div className='container text-center'>
    <button type="submit" onClick={handleClick} className="btn btn-success">Addnote</button>
    </div>
    </form>
    
    
    
    </div>
    
    <h1 className=' text-center text-light bg-success'>your notes</h1>
    </>
  )
}

export default AddNotes
