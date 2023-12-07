import { NavLink } from "react-router-dom";

export default function Navbar({ isAdmin }) {
  console.log("isAdmin (Navbar):", isAdmin);

  if (isAdmin) {
    return (
      <nav>
        <NavLink to="/admin/manage-about-me">Administrer Om Mig</NavLink>
        <NavLink to="/admin/manage-works">Administrer værker</NavLink>
        <NavLink to="/admin/manage-reviews">Administrer Anmeldelser</NavLink>
        <NavLink to="/admin/manage-news">Administrer Nyheder</NavLink>
        <NavLink to="/admin/manage-contact-me">Administrer Kontakt Information</NavLink>
      </nav>
    );
  } else {
    return (
      <nav>
        <NavLink to="/about-me">Om mig</NavLink>
        <NavLink to="/works">Værker</NavLink>
        <NavLink to="/reviews">Anmeldelser</NavLink>
        <NavLink to="/news">Nyheder</NavLink>
        <NavLink to="/contact-me">Kontakt mig</NavLink>
      </nav>
    );
  }
}
