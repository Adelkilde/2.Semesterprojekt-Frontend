import { useEffect, useState } from "react";

export default function AboutMePage() {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    async function getAuthor() {
      const url = "http://localhost:3333/works";
      const response = await fetch(url);
      const data = await response.json();
      const authorArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      setAuthor(authorArray);
    }
    getAuthor();
  }, []);
  console.log("About Me page");

  return console.log(author);
}
