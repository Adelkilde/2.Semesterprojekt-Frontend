import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkForm from "../components/WorkForm";

export default function UpdateWork() {
  const [work, setWork] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const url = `localhost:3333/works/${params.work_id}`;

  useEffect(() => {
    async function getWork() {
      const response = await fetch(url);
      const data = await response.json();
      setWork(data);
    }
    getWork();
  }, [url]);

  async function saveWork(workToUpdate) {
    workToUpdate.aid = work.aid;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(workToUpdate),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Work updated: ", data);
      navigate("/works");
    } else {
      console.log("Error updating work");
    }
  }
  async function deleteWork() {
    const confirmDelete = window.confirm(
      `Er du sikker på at du vil slette ${work.title}`
    );
    if (confirmDelete) {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Work deleted");
      } else {
        ("Error deleting work");
      }
    }
  }
  return (
    <section className="page">
      <h1>Opdater værk</h1>
      <WorkForm work={work} saveWork={saveWork} />
      <button className="btn-delete" onClick={deleteWork}>
        Slet værk
      </button>
    </section>
  );
}