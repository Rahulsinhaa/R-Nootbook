import './App.css'; import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/notesState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
// import { useNavigate } from "react-router-dom";
function App() {
  
  return (
    <>
        <NoteState>
      <BrowserRouter>
        <Navbar />
      <div className="container">
        <Routes>
        <Route exact path="/Login" element={<Login/>} />
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/Signup" element={<Signup/>} />
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
