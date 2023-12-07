import { Routes, Route, Navigate } from "react-router-dom";
import WorksPage from "./pages/WorksPage"; // Import your WorksPage component
import AboutMePage from "./pages/AboutMePage"; // Import your AboutMePage component
import ReviewsPage from "./pages/ReviewsPage"; // Import your ReviewsPage component
import NewsPage from "./pages/NewsPage"; // Import your NewsPage component
import ContactPage from "./pages/ContactPage"; // Import your ContactMe component
import CreateWorkPage from "./pages/CreateWorkPage";
import UpdateWorkPage from "./pages/UpdateWorkPage";
import CreateReviewPage from "./pages/CreateReviewPage";
import UpdateReviewPage from "./pages/UpdateReviewPage";
import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
         {/* { <Route path="/" element={<Home />} /> /} */}
          <Route path="/about-me" element={<AboutMePage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact-me" element={<ContactPage />} />
          <Route path="/create-work" element={<CreateWorkPage />} />
          <Route path="/works/:work_id" element={<UpdateWorkPage />} />
          <Route path="/create-review" element={<CreateReviewPage />} />
          <Route path="/reviews/:review_id" element={<UpdateReviewPage />} />
          <Route path="" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
} 
