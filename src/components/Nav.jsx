import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleToggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <nav className="nav">
      {isAdmin ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
      <NavLink className="nav-link" to="/" onClick={handleToggleAdmin}>
        {isAdmin ? "Brugersiden" : "Administratorsiden"}
      </NavLink>
    </nav>
  );
}
