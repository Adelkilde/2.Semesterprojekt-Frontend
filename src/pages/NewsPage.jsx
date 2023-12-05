import { useEffect, useState } from "react";

export default function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const url = "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/news";
      const response = await fetch(url);
      const data = await response.json();
      const newsArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      setNews(newsArray);
    }
    fetchNews();
  }, []);

  console.log("News page");

  return console.log(news);
}
