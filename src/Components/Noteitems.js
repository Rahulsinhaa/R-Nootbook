
import React from 'react';
import noteContext from '../Context/notes/notesContesxt';
import { useContext } from 'react';

function Noteitems(props) {
  const context =useContext(noteContext);
  const {deleteNote}=context;
    const {note,upadteNote}=props;
  return (
    <div className="col-md-3 my-3">
   <div className="card bg-success border border-white"> 
  <div className="card-body">
 
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary ">
  {note.tag}
  </span>

    <h5 className="card-title bg-success text-light"> {note.title +" "}</h5>
    <p className="card-text bg-success text-light">  {note.description}</p>

    <i className="fa-solid fa-trash-can mx-2 text-light"   onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2 text-light" onClick={()=>{upadteNote(note)}}></i>
  </div>
</div>
   </div>
  )
    
}

export default Noteitems