import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import NavbarAdmin from "./components/NavbarAdmin";
// import Home from "./pages/HomePage.jsx";
import AboutMe from "./pages/AboutMePage.jsx";
import Works from "./pages/WorksPage.jsx";
import Reviews from "./pages/ReviewsPage.jsx";
import News from "./pages/NewsPage.jsx";
// import ContactMe from "./pages/ContactMePage.jsx";
import ManageWorks from "./pages/ManageWorksPage.jsx";

export default function App() {
  // Check if the user is in the admin section based on the URL path
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  return (
    <>
      <Navbar />
      {isAdmin && <NavbarAdmin />} {/* Render NavbarAdmin only in admin section */}
      <main>
        <Routes>
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/works" element={<Works />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/news" element={<News />} />
          <Route path="/admin/manage-works" element={<ManageWorks />} />
          {/* Add other routes as needed */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}
