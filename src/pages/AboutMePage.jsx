import { useEffect, useState } from "react";

export default function AboutMePage() {
  const [author, setWorks] = useState([]);

  useEffect(() => {
    async function getAuthor() {
      const url =
        "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/author";
      const response = await fetch(url);
      const data = await response.json();
      const authorArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setWorks(authorArray);
    }
    getAuthor();
  }, []);
  console.log("Author page");

  return console.log(author);
}
