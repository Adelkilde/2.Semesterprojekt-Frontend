import { useEffect, useState } from "react";

export default function RewiewsPage() {
  const [rewiews, setRewiews] = useState([]);

  useEffect(() => {
    async function getRewiews() {
      const url = "http://localhost:3333/works";
      const response = await fetch(url);
      const data = await response.json();
      const rewiewsArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      setRewiews(rewiewsArray);
    }
    getRewiews();
  }, []);
  console.log("News page");

  return console.log(rewiews);
}
