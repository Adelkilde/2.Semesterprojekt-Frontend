import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function WorksPage() {
  const [works, setWorks] = useState([]);

  const fetchWorks = async () => {
    try {
      const url = "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/works";
      const response = await fetch(url);
      const data = await response.json();
      setWorks(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  console.log("Works page");

  return (
    <div className="container mt-5">
      <h1>Værker</h1>
      <ul className="list-group">
        {works.map((work) => (
          <li key={work.id} className="list-group-item">
            <p className="mb-1 h3">{work.title}</p>
            {work.image && <img src={work.image} alt="Work Image" className="img-fluid" />}
            <p className="mb-1">Udgivelses dato: {work.publication_date}</p>
            <p className="mb-1">Forlag: {work.publisher}</p>
            <p className="mb-1">{work.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
