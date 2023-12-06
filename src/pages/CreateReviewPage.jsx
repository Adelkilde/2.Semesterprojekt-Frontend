import { useNavigate } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

export default function CreateReview() {
  const navigate = useNavigate();

  async function createReview(newReview) {
    const url =
      "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New review created: ", data);
      navigate("/reviews");
    } else {
      console.log("Error creating review");
    }
  }
  return (
    <section className="page">
      <h1>Opret ny anmeldelse</h1>
      <ReviewForm saveReview={createReview} />
    </section>
  );
}
