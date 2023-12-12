import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Logo from "./components/Logo.jsx";
import AboutMe from "./pages/AboutMePage.jsx";
import Works from "./pages/WorksPage.jsx";
import Reviews from "./pages/ReviewsPage.jsx";
import News from "./pages/NewsPage.jsx";
import ContactMe from "./pages/ContactPage.jsx";
import ManageAboutMe from "./pages/ManageAboutMePage.jsx";
import ManageWorks from "./pages/ManageWorksPage.jsx";
import ManageReviews from "./pages/ManageReviewsPage.jsx";
import ManageNews from "./pages/ManageNewsPage.jsx";
// import ManageContactMe from "./pages/ManageContactMePage.jsx";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/admin")) {
      setIsAdmin(true);
    }
  }, [location.pathname]);

  return (
    <>
      <Logo />
      <Nav isAdmin={isAdmin} />
      <main>
        <Routes>
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/works" element={<Works />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact-me" element={<ContactMe />} />
          {isAdmin && (
            <Route path="/admin/manage-about-me" element={<ManageAboutMe />} />
          )}
          {isAdmin && (
            <Route path="/admin/manage-works" element={<ManageWorks />} />
          )}
          {isAdmin && (
            <Route path="/admin/manage-reviews" element={<ManageReviews />} />
          )}
           {isAdmin && <Route path="/admin/manage-news" element={<ManageNews />} />} 
          {/* {isAdmin && <Route path="/admin/manage-contact-me" element={<ManageContactMe />} />}  */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}
