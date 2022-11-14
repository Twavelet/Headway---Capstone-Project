import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header className="navBar">
      
        {/* <li className="fA">
          {user ? (
            <button onClick={() => navigate("/table")}>Focus Areas</button>
          ) : null}
        </li>
        <li className="add">
          {user ? (
            <button onClick={() => navigate("/addTask")}>Add Task</button>
          ) : null}
        </li> */}
        <div>
        <nav className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <b>Headway</b>
            {/* need to center this */}
          </Link>
        </nav>
        </div>
        <div >
        <nav className="login">
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </nav>
        </div>
      
    </header>
  );
};

export default Navbar;
