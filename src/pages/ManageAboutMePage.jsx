import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ManageAboutMePage() {
  const [author, setAuthor] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const fetchAuthor = async () => {
    const url = "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/author";
    const response = await fetch(url);
    const data = await response.json();
    const authorArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    setAuthor(authorArray);
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  const handleEditAuthor = (author) => {
    setSelectedAuthor(author);
  };

  return (
    <div className="container mt-5">
    <h1>Om Mig</h1>
    <ul className="list-group">
      {author.map((author) => (
        <li key={author.author_id} className="list-group-item">
          {author.image && <img src={author.image} alt="author Image" className="img-fluid" />}
          <p className="mb-1">{author.name}</p>
          <p className="mb-1">f. {author.birth_year}</p>
          <p className="mb-1">{author.biography}</p>
          <button onClick={() => handleEditAuthor(author)}>Rediger Info</button>
        </li>
      ))}
    </ul>
    {selectedAuthor && (
      <div id="authorForm">
        <label htmlFor="nameInput">Name:</label>
        <input type="text" id="nameInput" />
  
        <label htmlFor="birthYearInput">Birth Year:</label>
        <input type="text" id="birthYearInput" />
  
        <label htmlFor="biographyTextarea">Biography:</label>
        <textarea id="biographyTextarea"></textarea>
  
        <button type="submit">Submit</button>
      </div>
    )}
  </div>
  
  
  );
}
