// import { useEffect, useState } from "react";

// export default function ContactMePage() {
//   const [author, setAuthor] = useState([]);

//   useEffect(() => {
//     async function fetchAuthor() {
//       const url = "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/author";
//       const response = await fetch(url);
//       const data = await response.json();
//       const authorArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
//       setAuthor(authorArray);
//     }
//     fetchAuthor();
//   }, []);

//   console.log("Contact page");

//     return (
//     <div className="container contact">
//       <h1>Kontakt Mig</h1>
//       <ul className="list-group">
//         {author.map((author) => (
//           <li key={author.id} className="list-group-item">
//             {author.image && <img src={author.image} alt="author Image" className="img-fluid" />}
//             <p className="mb-1">{author.name}</p>
//             <p className="mb-1">f. {author.birth_year}</p>
//             <p className="mb-1">{author.biography}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

export default function ContactMePage() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const url = "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/author";
        const response = await fetch(url);
        const data = await response.json();
        const authorArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
          socialMedia: {
            twitter: "https://twitter.com/example", // Fiktivt Twitter link
            linkedin: "https://linkedin.com/in/example", // Fiktivt LinkedIn link
            facebook: "https://facebook.com/example", // Fiktivt Facebook link
            instagram: "https://instagram.com/example" // Fiktivt Instagram link
          },
        }));
        setAuthors(authorArray);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    }
    fetchAuthors();
  }, []);

  console.log("Contact page");

  return (
    <div className="container contact">
      <h1>Kontakt Mig</h1>
      <ul className="list-group">
        {authors.map((author) => (
          <li key={author.id} className="list-group-item">
            {/* {author.image && <img src={author.image} alt="author Image" className="img-fluid" />} */}
            <p className="mb-1">{author.name}</p>
            <p className="mb-1">f. {author.birth_year}</p>
            {/* Kontaktinformation for hver forfatter */}
            <p className="mb-1">Email: Placeholder Email{author.email}</p>
            <div className="social-media-links">
              {author.socialMedia && (
                <>
                  {author.socialMedia.twitter && (
                    <a href={author.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  )}
                  {author.socialMedia.linkedin && (
                    <a href={author.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  )}
                  {author.socialMedia.facebook && (
                    <a href={author.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  )}
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
