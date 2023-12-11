import { NavLink } from "react-router-dom";

export default function Navbar({ isAdmin }) {
  console.log("isAdmin (Navbar):", isAdmin);

  if (isAdmin) {
    return (
      <nav className="nav">
        <NavLink className="nav-link" to="/admin/manage-about-me">
          Administrer om mig
        </NavLink>
        <NavLink className="nav-link" to="/admin/manage-works">
          Administrer værker
        </NavLink>
        <NavLink className="nav-link" to="/admin/manage-reviews">
          Administrer anmeldelser
        </NavLink>
        <NavLink className="nav-link" to="/admin/manage-news">
          Administrer nyheder
        </NavLink>
        <NavLink className="nav-link" to="/admin/manage-contact-me">
          Administrer kontakt information
        </NavLink>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <NavLink className="nav-link" to="/about-me">
          Om mig
        </NavLink>
        <NavLink className="nav-link" to="/works">
          Værker
        </NavLink>
        <NavLink className="nav-link" to="/reviews">
          Anmeldelser
        </NavLink>
        <NavLink className="nav-link" to="/news">
          Nyheder
        </NavLink>
        <NavLink className="nav-link" to="/contact-me">
          Kontakt mig
        </NavLink>
      </nav>
    );
  }
}
