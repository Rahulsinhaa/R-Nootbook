import React, {useEffect}from 'react'
import { Link ,useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();
    
useEffect(() => {
  console.log(location.pathname)
  }, [location]);
 const handlelogout=()=>{
    localStorage.clear();
    console.log("rahul");
    navigate("/Login",{replace:true});
    window.location.reload();

 }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-success" style={{color:"white"}}>
                <div className="container-fluid ">
                    <Link className="navbar-brand text-light" to="/">R-Notebook</Link>
                    <button className="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse text-light" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className= {`nav-link ${location.pathname==="/"?"active":""} text-light`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/About"?"active":""} text-light`} to="/About">About</Link>
                            </li>
                            <li className="nav-item dropdown">

                            </li>

                        </ul>
                        
                       {!localStorage.getItem('token')?
                        <form className="d-flex ">
                        <Link className="btn btn-light mx-2 text-success" to="/Login" role="button">Login</Link>
                        <Link className="btn btn-light text-success" to="/Signup" role="button">Signup</Link>
                        </form>:<button onClick={handlelogout} className="btn btn-primary">Logout</button>
                       }        
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar