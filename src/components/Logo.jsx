// Logo.jsx
import { NavLink } from "react-router-dom";
import LogoImage from "../assets/images/Logo4.cropped.png";

export default function Logo() {
  return (
    <NavLink to="/">
      <img className="logo" src={LogoImage} alt="Logo" />
    </NavLink>
  );
}
