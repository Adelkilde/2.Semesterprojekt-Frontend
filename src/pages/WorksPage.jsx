import { useEffect, useState } from "react";

export default function WorksPage() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    async function getWorks() {
      const url = "http://localhost:3333/works";
      const response = await fetch(url);
      const data = await response.json();
      const worksArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setWorks(worksArray);
    }
    getWorks();
  }, []);
  console.log("Works page");

  return (
    <div>
      <h1>Works Page</h1>
      <ul>
        {works.map((work) => (
          <li key={work.id}>
            <li>
              <p>Titel: {work.title}</p>
            </li>
            <li>
              <p>Udgivelses dato: {work.publication_date}</p>
            </li>
            <li>
              <p>Forlag: {work.publisher}</p>
            </li>
            <li>
              <p>Beskrivelse: {work.description}</p>
            </li>
            {work.image}
          </li>
        ))}
      </ul>
    </div>
  );
}
