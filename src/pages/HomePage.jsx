// import { useEffect, useState } from "react";
// // import WorksPage from "./WorksPage";
// // import NewsPage from "./NewsPage";
// // import ReviewsPage from "./ReviewsPage";

// export default function HomePage() {
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     async function getHomePage() {
//       const url = "http://localhost:3333/works";
//       const response = await fetch(url);
//       const data = await response.json();
//       const newsArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
//       setNews(newsArray);
//     }
//     getNews();
//   }, []);
//   console.log("Home page");

//   return console.log(news);
// }
