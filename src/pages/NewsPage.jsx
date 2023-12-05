import { useEffect, useState } from "react";

export default function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function getNews() {
      const url = "http://localhost:3333/news";
      const response = await fetch(url);
      const data = await response.json();
      const newsArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      setNews(newsArray);
    }
    getNews();
  }, []);
  console.log("News page");

  return console.log(news);
}
