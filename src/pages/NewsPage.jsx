import { useEffect, useState } from "react";

export default function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function getNews() {
      const url =
        "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/news";
      const response = await fetch(url);
      const data = await response.json();
      const newsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      newsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNews(newsArray);
    }
    getNews();
  }, []);
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  };
  console.log("News page");

  return (
    <div className="container mt-5">
      <h1>Nyheder</h1>
      <ul className="list-group">
        {news.map((article) => (
          <li key={article.id} className="list-group-item">
            <h2>{article.headline}</h2>
            <div>{article.content}</div>
            <div>{formatDate(article.createdAt)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
