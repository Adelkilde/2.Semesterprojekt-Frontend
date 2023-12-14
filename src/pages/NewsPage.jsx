import { useEffect, useState } from "react";
import FormatDate from "../components/FormatDate";

export default function NewsPage() {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/news");
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Nyheder</h1>
      <ul className="list-group">
        {news
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((article) => (
            <li key={article.news_id} className="list-group-item">
              <h2>{article.headline}</h2>
              <p>{article.content}</p>
              <p className="mb-1">
                <FormatDate dateString={new Date(article.createdAt).toISOString().split("T")[0]} />
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
