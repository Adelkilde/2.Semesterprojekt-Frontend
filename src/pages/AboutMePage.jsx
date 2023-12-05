import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AboutMePage() {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    async function getAuthor() {
      const url = "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/author";
      const response = await fetch(url);
      const data = await response.json();
      const authorArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      setAuthor(authorArray);
    }
    getAuthor();
  }, []);
  console.log("Author page");

  return (
    <div className="container mt-5">
      <h1>Om Mig</h1>
      <ul className="list-group">
        {author.map((author) => (
          <li key={author.id} className="list-group-item">
            {author.image && <img src={author.image} alt="author Image" className="img-fluid" />}
            <p className="mb-1">{author.name}</p>
            <p className="mb-1">f.{author.birth_year}</p>
            <p className="mb-1">{author.biography}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
