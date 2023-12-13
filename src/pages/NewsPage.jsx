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

  return (
    <div className="container mt-5">
      <h1>Nyheder</h1>
      <ul className="list-group">
        {news.map((article) => (
          <li key={article.id} className="list-group-item">
            <h2>{article.headline}</h2>
            <div>{article.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
