import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewForm from "../components/ReviewEditor";

export default function ManageReviewPage() {
  const [data, setData] = useState({ reviews: [], works: [] });
  const [selectedReview, setSelectedReview] = useState(null);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);

  const fetchReviewsAndWorks = async () => {
    try {
      const [reviewsResponse, worksResponse] = await Promise.all([fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews"), fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/works")]);
      const reviewsData = await reviewsResponse.json();
      const worksData = await worksResponse.json();
      setData({
        reviews: Object.keys(reviewsData).map((key) => ({
          id: key,
          ...reviewsData[key],
        })),
        works: Object.keys(worksData).map((key) => ({
          id: key,
          ...worksData[key],
        })),
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchReviewsAndWorks();
  }, []);

  const { reviews, works } = data;

  const handleOpenCreateForm = () => {
    setCreateFormOpen(true);
    setSelectedReview(null);
  };

  const handleCloseCreateForm = () => {
    setCreateFormOpen(false);
  };

  const fetchOptions = (method, body) => ({
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const handleSaveReview = async (formData) => {
    const url = "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews";
    const method = "POST";

    try {
      const response = await fetch(
        url,
        fetchOptions(method, {
          work_id: formData.work_id,
          name: formData.name,
          email: formData.email,
          review_text: formData.review_text,
          rating: formData.rating,
        })
      );

      if (response.ok) {
        console.log("New review created:");
        fetchReviewsAndWorks();
        handleCloseCreateForm();
      } else {
        console.log("Error creating new review");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div id="authorForm" className="container mt-5">
      <h1>Anmeldelser </h1>
      <div>
        <button onClick={handleOpenCreateForm}>Opret anmeldelse</button>
        {/* Display the list of reviews */}
        <ul className="list-group">
          {reviews.map((review) => {
            const work = works.find((work) => work.work_id === review.work_id);

            const stars = Array.from({ length: review.rating }, (_, index) => (
              <span key={index} role="img" aria-label="star">
                ⭐
              </span>
            ));

            return (
              <li key={review.review_id} className="list-group-item">
                <p>{work ? work.title : "Loading..."}</p>

                <p className="mb-1">{stars}</p>
                <p className="mb-1">{review.review_text}</p>
                <p className="mb-1">{review.date}</p>
                <p className="mb-1">
                  {new Date(review.createdAt)
                    .toLocaleDateString("da-DK", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split(".")
                    .join("/")}
                </p>
                <p className="mb-1">
                  Af <strong>{review.name}</strong>
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <div>{isCreateFormOpen && <ReviewForm saveReview={handleSaveReview} onCancelCreate={handleCloseCreateForm} review={selectedReview} />}</div>
    </div>
  );
}
