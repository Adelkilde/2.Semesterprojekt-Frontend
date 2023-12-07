import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

export default function UpdateReview() {
  const [review, setReview] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const url = `https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews/${params.review_id}`;
  useEffect(() => {
    async function getReview() {
      const response = await fetch(url);
      const data = await response.json();
      setReview(data);
    }
    getReview();
  }, [url]);

  async function saveReview(reviewToUpdate) {
    reviewToUpdate.wid = review.wid;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewToUpdate),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Review updated: ", data);
      navigate("/reviews");
    } else {
      console.log("Error updating review");
    }
  }
  async function deleteReview() {
    const confirmDelete = window.confirm(
      `Er du sikker på at du vil slette anmeldelsen?`
    );
    if (confirmDelete) {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Review deleted");
        navigate("/reviews");
      } else {
        console.log("Error deleting review");
      }
    }
  }
  return (
    <section className="page">
      <h1>Opdater anmeldelse</h1>
      {review && (
        <>
          <div>
            <h2>{review.name}</h2>
            <h2>{review.rating} stjerner</h2>
            <p>{review.review_text}</p>
          </div>
          <ReviewForm review={review} saveReview={saveReview} />
          <button className="btn-delete" onClick={deleteReview}>
            Slet værk
          </button>
        </>
      )}
    </section>
  );
}
