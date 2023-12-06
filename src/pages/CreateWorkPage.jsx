import { useNavigate } from "react-router-dom";
import WorkForm from "../components/WorkForm";

export default function CreateWork() {
  const navigate = useNavigate();

  async function createWork(newWork) {
    const url =
      "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/works";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newWork),
    });
    console.log(newWork);
    if (response.ok) {
      const data = await response.json();
      console.log("New work created: ", data);
      navigate("/works");
    } else {
      console.log("Error creating new work");
    }
  }
  return (
    <section className="page">
      <h1>Opret nyt værk</h1>
      <WorkForm saveWork={createWork} />
    </section>
  );
}
