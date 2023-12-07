import { NavLink } from "react-router-dom";
import LogoImage from "../assets/images/Logo4.cropped.png";

export default function Navbar({ isAdmin }) {
  console.log("isAdmin (Navbar):", isAdmin);

  if (isAdmin) {
    return (
      <nav>
        <NavLink to="/">
          <img className="logo" src={LogoImage} alt="Logo" />
        </NavLink>
        <NavLink className="nav-link" to="/admin/manage-about-me">Administrer Om Mig</NavLink>
        <NavLink className="nav-link" to="/admin/manage-works">Administrer værker</NavLink>
        <NavLink className="nav-link" to="/admin/manage-reviews">Administrer Anmeldelser</NavLink>
        <NavLink className="nav-link" to="/admin/manage-news">Administrer Nyheder</NavLink>
        <NavLink className="nav-link" to="/admin/manage-contact-me">Administrer Kontakt Information</NavLink>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <NavLink to="/">
        <img className="logo" src={LogoImage} alt="Logo" />
        </NavLink>
        <NavLink className="nav-link" to="/about-me">Om mig</NavLink>
        <NavLink className="nav-link" to="/works">Værker</NavLink>
        <NavLink className="nav-link" to="/reviews">Anmeldelser</NavLink>
        <NavLink className="nav-link" to="/news">Nyheder</NavLink>
        <NavLink className="nav-link" to="/contact-me">Kontakt mig</NavLink>
      </nav>
    );
  }
}
