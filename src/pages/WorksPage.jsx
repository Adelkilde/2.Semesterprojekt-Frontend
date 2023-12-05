import { useEffect, useState } from "react";

export default function WorksPage() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    async function getWorks() {
      const url = "http://localhost:3333/works";
      const response = await fetch(url);
      const data = await response.json();
      const worksArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      setWorks(worksArray);
    }
    getWorks();
  }, []);
  console.log("Works page");

  return console.log(works);
}
