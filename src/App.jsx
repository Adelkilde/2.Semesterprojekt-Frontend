import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
// import Home from "./pages/HomePage.jsx";
import AboutMe from "./pages/AboutMePage.jsx";
import Works from "./pages/WorksPage.jsx";
import Reviews from "./pages/ReviewsPage.jsx";
import News from "./pages/NewsPage.jsx";
import ContactMe from "./pages/ContactPage.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/works" element={<Works />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact-me" element={<ContactMe />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}
