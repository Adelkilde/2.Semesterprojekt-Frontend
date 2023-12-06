import { NavLink } from "react-router-dom";
// import "./Navbar.css"; // Import the CSS file

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink className="nav-link" to="/">Home</NavLink>
      <NavLink className="nav-link" to="/about-me">Om mig</NavLink>
      <NavLink className="nav-link" to="/works">Værker</NavLink>
      <NavLink className="nav-link" to="/reviews">Anmeldelser</NavLink>
      <NavLink className="nav-link" to="/news">Nyheder</NavLink>
      <NavLink className="nav-link" to="/contact-me">Kontakt mig</NavLink>
    </nav>
  );
}