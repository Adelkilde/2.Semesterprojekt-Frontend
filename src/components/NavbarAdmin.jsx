import { NavLink } from "react-router-dom";

export default function NavbarAdmin() {
  return (
    <nav>
      {/* Admin-specific navigation links */}
      <NavLink to="/">Home</NavLink> {/* Equivalent to /admin/ */}
      <NavLink to="/admin/manage-works">Administrer værker</NavLink>
      <NavLink to="/admin/manage-reviews">Administrer Anmeldelser</NavLink>
      <NavLink to="/admin/manage-news">Administrer Nyheder</NavLink>
      <NavLink to="/admin/manage-contact-me">Administrer Kontakt Information</NavLink>
      {/* ... other admin links */}
    </nav>
  );
}
