// import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
// import Navbar from "./components/Navbar";
import WorksPage from "./pages/WorksPage";
import NewsPage from "./pages/NewsPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutMePage from "./pages/AboutMePage"; 
import ContactMePage from "./pages/ContactPage";
// import HomePage from "./pages/HomePage";

export default function App() {
  const publicRoutes = (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/works" element={<WorksPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/about-me" element={<AboutMePage />} />
      <Route path="/contact-me" element={<ContactMePage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
    </Routes>
  );
  return <main>{publicRoutes}</main>;
}
