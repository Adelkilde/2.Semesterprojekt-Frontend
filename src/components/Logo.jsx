import { NavLink } from "react-router-dom";
import LogoImage from "../assets/images/Logo4.cropped.png";

export default function Logo({ isSmall }) {
  return (
    <NavLink to="/">
      <img className={`logo ${isSmall ? "logo-small" : ""}`} src={LogoImage} alt="Logo" />
    </NavLink>
  );
}
