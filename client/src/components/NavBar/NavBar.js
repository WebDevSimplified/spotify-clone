import {NavLink} from "react-router-dom";
import './navbar.css'

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light my-navbar">
      <ul className="navbar-nav mr-auto">
        <li>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/library" className="nav-link">
            Library
          </NavLink>
        </li>
        <li>
          <NavLink to="/recommended" className="nav-link">
            Recommended
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className="nav-link">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/user" className="nav-link">
            User
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
