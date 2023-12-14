import { useEffect, useState } from "react";

export default function ContactMePage() {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const url = "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/author";
      const response = await fetch(url);
      const data = await response.json();
      const authorArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
        socialMedia: {
          instagram:
            "https://www.instagram.com/caroline_storgaard_gyldmark/?fbclid=IwAR1sTNGJ3e4pXQAz5OBmrHTP7Gpgg0M1ZI4J81emGBumZMpByGOCcgybIUE", // Fiktivt Instagram link
        },
      }));
      setAuthors(authorArray);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="container contact">
      <h1>Kontakt Mig</h1>
      <ul className="list-group">
        {authors.map((author) => (
          <li key={author.id} className="list-group-item">
            <p className="mb-1">Email: Caroline.storgaard.digter@gmail.com</p>
            <div className="social-media-links">
              {author.socialMedia && (
                <>
                  {author.socialMedia.instagram && (
                    <a href={author.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
