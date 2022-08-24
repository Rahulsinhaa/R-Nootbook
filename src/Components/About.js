import React from 'react'
// import NoteContext from '../Context/notes/notesContesxt'
function About() {

  return (
    <div className='container  my-3'>
 <div className="card border-success border-5 mb-3">
  <div className="card-header bg-transparent border-danger border-3 text-center" style={{fontSize: "40px"}}>About the application</div>
  <div className="card-body text-success">
    <h5 className="card-title text-center">Success card title</h5>
    <p className="card-text">eNotes is a literary analysis website where students and teachers can access summaries, analyses, lesson plans, and homework help about classic and contemporary literary works. Novels, speeches, essays, plays, and biographies are among the content available, and there's a huge selection of titles from which to choose.</p>
  </div>
  <div className="card-footer bg-transparent border-success">Footer</div>
</div>
    </div>
  )
}

export default About
