import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about-me">Om mig</NavLink>
      <NavLink to="/works">Værker</NavLink>
      <NavLink to="/reviews">Anmeldelser</NavLink>
      <NavLink to="/news">Nyheder</NavLink>
      <NavLink to="/contact-me">Kontakt mig</NavLink>
    </nav>
  );
}
