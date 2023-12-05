import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import WorksPage from "./pages/WorksPage";

export default function App() {
  const publicRoutes = (
    <Routes>
      <Route path="/works" element={<WorksPage />} />
    </Routes>
  );
  return <main>{publicRoutes}</main>;
}
