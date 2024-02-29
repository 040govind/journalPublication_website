import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


const Navvar = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // get user
  const [user,setUser] = useState(null);
  console.log(token);
  if(token!='undefined')
  {
    console.log(token);
     setUser(jwtDecode(token));
  }
  const isLoggedIn = token =='undefined' ? false:true;
  const isAdmin = user && user.isAdmin;

  const handleLogout = () => {
    localStorage.removeItem('token');
    
    setUser('');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/submit_paper">
                      Submit Paper
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/profile">
                      Profile
                    </Link>
                  </li>
                  {isAdmin && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link mx-2" to="/all_paper">
                          All Paper
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link mx-2" to="/list_of_reviewer">
                          List Of Reviewer
                        </Link>
                      </li>
                    </>
                  )}
                  <li className="nav-item">
                    <button className="btn btn-link nav-link mx-2" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/">
                      Home
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navvar;
