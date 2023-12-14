import { useEffect, useState } from "react";

export default function NewsPage() {
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/news");
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  return (
    <div className="container mt-5">
      <h1>Nyheder</h1>
      <ul className="list-group">
        {news.map((article) => (
          <li key={article.news_id} className="list-group-item">
            <h2>{article.headline}</h2>
            <div>{article.content}</div>
            <div>{formatDate(article.createdAt)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
