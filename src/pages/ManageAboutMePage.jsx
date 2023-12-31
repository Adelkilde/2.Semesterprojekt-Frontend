import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutMeEditor from "../components/AboutMeEditor";

export default function ManageAboutMePage() {
  const [author, setAuthor] = useState({});
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const fetchAuthor = async () => {
    const response = await fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/author/1");
    const data = await response.json();
    setAuthor(data);
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  const handleEditAuthor = (author) => {
    setSelectedAuthor(author);
  };

  const handleSaveAuthor = async (formData) => {
    const url = `https://semesterprojekt2-deployment-with-azure.azurewebsites.net/author/${selectedAuthor.author_id}`;
    const method = "PUT";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Author updated successfully");
        // Fetch the updated list of authors
        fetchAuthor();
        // Clear the selected author
        setSelectedAuthor(null);
      } else {
        console.error("An error occurred:", response);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCancelEdit = () => {
    setSelectedAuthor(null);
  };

  return (
    <div id="authorForm" className="container mt-5">
      <h1>Om Mig</h1>
      <ul className="list-group">
        <li key={author.author_id} className="list-group-item">
          {author.image && <img src={author.image} alt="author Image" className="img-fluid" />}
          <p className="mb-1">{author.name}</p>
          <p className="mb-1">f. {author.birth_year}</p>
          <p className="mb-1">{author.biography}</p>
          <button onClick={() => handleEditAuthor(author)}>Rediger info</button>
        </li>
      </ul>
      {selectedAuthor && <AboutMeEditor saveAboutMe={handleSaveAuthor} onCancelEdit={handleCancelEdit} aboutMe={selectedAuthor} />}
    </div>
  );
}
