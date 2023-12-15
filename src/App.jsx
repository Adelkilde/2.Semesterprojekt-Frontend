import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Logo from "./components/Logo";
import AboutMe from "./pages/AboutMePage";
import Works from "./pages/WorksPage";
import Reviews from "./pages/ReviewsPage";
import News from "./pages/NewsPage";
import ContactMe from "./pages/ContactPage";
import ManageAboutMe from "./pages/ManageAboutMePage";
import ManageWorks from "./pages/ManageWorksPage";
import ManageReviews from "./pages/ManageReviewsPage";
import ManageNews from "./pages/ManageNewsPage";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (location.pathname.includes("/admin")) {
      setIsAdmin(true);
    }
  }, [location.pathname]);

  return (
    <>
      <Logo isSmall={!isHomePage} />
      <Nav isAdmin={isAdmin} />
      <main>
        <Routes>
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/works" element={<Works />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact-me" element={<ContactMe />} />
          {isAdmin && <Route path="/admin/manage-about-me" element={<ManageAboutMe />} />}
          {isAdmin && <Route path="/admin/manage-works" element={<ManageWorks />} />}
          {isAdmin && <Route path="/admin/manage-reviews" element={<ManageReviews />} />}
          {isAdmin && <Route path="/admin/manage-news" element={<ManageNews />} />}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}
