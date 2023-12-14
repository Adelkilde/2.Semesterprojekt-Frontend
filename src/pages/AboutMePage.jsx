import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AboutMePage() {
  const [author, setAuthor] = useState({});

  const fetchAuthor = async () => {
    try {
      const response = await fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/author/1");
      const data = await response.json();
      setAuthor(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Om mig</h1>
      <ul className="list-group">
        <li key={author.author_id} className="list-group-item">
          {author.image && <img src={author.image} alt="author Image" className="img-fluid" />}
          <p className="mb-1">{author.name}</p>
          <p className="mb-1">f. {author.birth_year}</p>
          <p className="mb-1">{author.biography}</p>
        </li>
      </ul>
    </div>
  );
}
