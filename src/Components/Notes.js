import React, { useContext, useEffect, useRef,useState } from 'react'
import NoteContext from '../Context/notes/notesContesxt';
import AddNotes from './AddNotes';
import Noteitems from './Noteitems';
import { useNavigate } from "react-router-dom";
import Login from './Login';

 

const Notes=()=>{
 const context = useContext(NoteContext)
   let navigate = useNavigate();
  
  const { notes, getNotes,editNote,setrk} = context;
  useEffect(() => {
    // localStorage.getItem('token')?navigate("/", { replace: true }):navigate("/Login", { replace: true })
    console.log(setrk());
    if(localStorage.getItem('token2')===localStorage.getItem('token')){
      getNotes()
      navigate("/",{replace:true});
    console.log();
    }
    else {
      navigate("/Login",{replace:true});
    }
   
     // eslint-disable-next-line
  },[])
  const ref = useRef(null)
  const closeRef = useRef(null) 
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

  const upadteNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }

  const handleClick1=(e)=>{
    console.log("updating the note",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    // e.preventDefault();
     closeRef.current.click()
   
}

const onChange=(e)=>{
    
      setNote({...note,[e.target.name]: e.target.value})
}
  return (<>
    <AddNotes />

    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3 ">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" value={note.etitle}id="etitle" aria-describedby="emailHelp" name="etitle" onChange={onChange} />
                <div id="emailHelp" className="form-text">.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="desc" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
              </div>
              <button ref={closeRef} type="submit" onClick={handleClick1} className="btn btn-primary">Addnote</button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div className='row'>
      {notes.map((note) => {
        return <Noteitems key={note._id} upadteNote={upadteNote} note={note} />
      })}

    </div>
  </>
  )
}

export default Notes
