import { Routes, Route } from "react-router-dom";
import WorksPage from "./pages/WorksPage"; // Import your WorksPage component
import AboutMePage from "./pages/AboutMePage"; // Import your AboutMePage component
import ReviewsPage from "./pages/ReviewsPage"; // Import your ReviewsPage component
import NewsPage from "./pages/NewsPage"; // Import your NewsPage component
import CreateWorkPage from "./pages/CreateWorkPage";
import UpdateWorkPage from "./pages/UpdateWorkPage";
export default function App() {
  const publicRoutes = (
    <Routes>
      <Route path="/works" element={<WorksPage />} />
      <Route path="/about-me" element={<AboutMePage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/create-work" element={<CreateWorkPage />} />
      <Route path="/works/:work_id" element={<UpdateWorkPage />} />
    </Routes>
  );

  return <main>{publicRoutes}</main>;
}
