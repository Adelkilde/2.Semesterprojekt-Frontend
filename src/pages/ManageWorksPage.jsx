import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import WorkForm from "../components/WorkEditor";

export default function ManageWorksPage() {
  const [works, setWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);

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

  const handleEditWork = (work) => {
    setSelectedWork(work);
  };

  const handleCancelEditWork = () => {
    setSelectedWork(null);
  };

  const fetchOptions = (method, body) => ({
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const handleSaveWork = async (formData) => {
    const url = selectedWork
      ? `https://semesterprojekt2-deployment-with-azure.azurewebsites.net/works/${selectedWork.work_id}`
      : "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/works";

    const method = selectedWork ? "PUT" : "POST";

    try {
      const response = await fetch(
        url,
        fetchOptions(method, {
          author_id: formData.author_id,
          title: formData.title,
          publication_date: formData.publication_date,
          publisher: formData.publisher,
          description: formData.description,
          image: formData.image,
        })
      );

      if (response.ok) {
        console.log(selectedWork ? "Work updated:" : "New work created:");
        fetchWorks();
        handleCancelEditWork(); // Clear selectedWork after saving
      } else {
        console.log(selectedWork ? "Error updating work" : "Error creating new work");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDeleteWork = async (work) => {
    const confirmDelete = window.confirm(`Er du sikker på at du vil slette ${work.title}`);
    if (confirmDelete) {
      const url = `https://semesterprojekt2-deployment-with-azure.azurewebsites.net/works/${work.work_id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Work deleted");
        // Refresh the works list after deletion
        fetchWorks();
      } else {
        console.log("Error deleting work");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Værker</h1>
      <ul className="list-group">
        {works.map((work) => (
          <li key={work.work_id} className="list-group-item">
            <p className="mb-1 h3">{work.title}</p>
            {work.image && <img src={work.image} alt="Work Image" className="img-fluid" />}
            <p className="mb-1">Udgivelses dato: {work.publication_date}</p>
            <p className="mb-1">Forlag: {work.publisher}</p>
            <p className="mb-1">{work.description}</p>
            <button className="btn btn-info mr-2" onClick={() => handleEditWork(work)}>
              Rediger
            </button>
            <button className="btn btn-danger" onClick={() => handleDeleteWork(work)}>
              Slet
            </button>
          </li>
        ))}
      </ul>

      <WorkForm
        saveWork={handleSaveWork}
        deleteWork={handleDeleteWork}
        work={selectedWork}
        onCancelEdit={handleCancelEditWork}
      />
    </div>
  );
}
