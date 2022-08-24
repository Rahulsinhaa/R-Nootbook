import { useState } from "react";
//import Login from "../../Components/Login";
import NoteContext from "./notesContesxt";
// import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  // let navigate = useNavigate();
  const host = "http://localhost:5000"
  const notesInitial =[]
  const [notes, setNotes] = useState(notesInitial)
  
  const [rk, setrk] = useState("rahul");

// const componentDidUpdate=()=>{
//   console.log("random-text");
// }

  // get all note fromthe mongo db
  const getNotes = async(title, description, tag) => {
    //to do api call
   
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    // const json= response.json();
const rk=await response.json();
    
   console.log(rk);
   setNotes(rk)
  }

  //add a note 
  const addNote = async(title, description, tag) => {
    //to do api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        "auth-token":  localStorage.getItem('token'),

      },

       body: JSON.stringify({title,description,tag})
    });
    const jT= await response.json();
     console.log(jT)
     const note = jT
    setNotes(notes.concat(note));

  };
 const rahul=(rk)=>{
  return rk;
 }
  //delete a note 
  const deleteNote = async(id) => {
       
    //to do api call
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        "auth-token":  localStorage.getItem('token'),

      },

    });
    const json= response.json();
    console.log(json)
    console.log("deleting th node with id" + id);
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }
  // edit a note 
  const editNote = async (id, title, description, tag) => {
    //api calls to do 
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        "auth-token":  localStorage.getItem('token')

      },

      body: JSON.stringify({title,description,tag})
    });
    const json= response.json();
    console.log(json)

  
  // loginc to edit in cliet
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];

    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }

  }
}

return (
  <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes,rahul,setrk}}>
    {props.children}
  </NoteContext.Provider>
)     
  }
export default NoteState;