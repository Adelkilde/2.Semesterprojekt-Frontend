import { useEffect, useState } from "react";

export default function ContactMePage() {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    async function fetchAuthor() {
      const url = "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/author";
      const response = await fetch(url);
      const data = await response.json();
      const authorArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      setAuthor(authorArray);
    }
    fetchAuthor();
  }, []);

  console.log("Contact page");

    return (
    <div className="container contact">
      <h1>Kontakt</h1>
      <ul className="list-group">
        {author.map((author) => (
          <li key={author.id} className="list-group-item">
            {author.image && <img src={author.image} alt="author Image" className="img-fluid" />}
            <p className="mb-1">{author.name}</p>
            <p className="mb-1">f. {author.birth_year}</p>
            <p className="mb-1">{author.biography}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
