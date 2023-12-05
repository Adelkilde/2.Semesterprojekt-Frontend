import { Routes, Route } from "react-router-dom";
import WorksPage from "./pages/WorksPage"; // Import your WorksPage component
import AboutMePage from "./pages/AboutMePage"; // Import your AboutMePage component
import ReviewsPage from "./pages/ReviewsPage"; // Import your ReviewsPage component
import NewsPage from "./pages/NewsPage"; // Import your NewsPage component

export default function App() {
  const publicRoutes = (
    <Routes>
      <Route path="/works" element={<WorksPage />} />
      <Route path="/about-me" element={<AboutMePage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/news" element={<NewsPage />} />
    </Routes>
  );

  return <main>{publicRoutes}</main>;
}
