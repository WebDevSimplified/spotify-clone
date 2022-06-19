import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <li>
          <NavLink to="/" className="nav-link">
            {" "}
            Home{" "}
          </NavLink>
        </li>
        <li>
          <NavLink to="/test" className="nav-link">
            Test
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
