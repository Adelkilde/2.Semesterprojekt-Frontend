import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewForm from "../components/ReviewEditor";

export default function ManageReviewPage() {
  const [data, setData] = useState({ reviews: [], works: [] });
  const [selectedReview, setSelectedReview] = useState(null);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);

  const fetchReviewsAndWorks = async () => {
    try {
      const [reviewsResponse, worksResponse] = await Promise.all([
        fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews"),
        fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/works"),
      ]);
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

  const handleEditReview = (review) => {
    setSelectedReview(review);
    handleOpenEditForm();
  };

  const handleCancelEditReview = () => {
    setSelectedReview(null);
  };

  const handleOpenEditForm = () => {
    setEditFormOpen(true);
  };

  const handleOpenCreateForm = () => {
    setCreateFormOpen(true);
    setSelectedReview(null);
  };

  const handleCloseCreateForm = () => {
    setCreateFormOpen(false);
  };

  const handleCloseEditForm = () => {
    setEditFormOpen(false);
    handleCancelEditReview();
  };

  const fetchOptions = (method, body) => ({
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const handleSaveReview = async (formData) => {
    const url = selectedReview
      ? `https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews/${selectedReview.review_id}`
      : "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews";

    const method = selectedReview ? "PUT" : "POST";

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
        console.log(selectedReview ? "Review updated:" : "New review created:");
        fetchReviewsAndWorks();
        handleCancelEditReview(); // Clear selectedReview after saving
        if (!selectedReview) {
          handleCloseCreateForm(); // Close the create form after creating a new review
        }
      } else {
        console.log(selectedReview ? "Error updating review" : "Error creating new review");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDeleteReview = async (review) => {
    const confirmDelete = window.confirm(`Er du sikker på at du vil slette dette review`);
    if (confirmDelete) {
      const url = `https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews/${review.review_id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Review deleted");
        // Refresh the works list after deletion
        fetchReviewsAndWorks();
      } else {
        console.log("Error deleting work");
      }
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
                <button className="btn btn-info button-margin-right" onClick={() => handleEditReview(review)}>
                  Rediger
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteReview(review)}>
                  Slet
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        {isCreateFormOpen && (
          <ReviewForm saveReview={handleSaveReview} onCancelCreate={handleCloseCreateForm} review={selectedReview} />
        )}
        {isEditFormOpen && (
          <ReviewForm
            saveReview={handleSaveReview}
            onCancelEdit={() => {
              handleCloseEditForm();
              handleCancelEditReview();
            }}
            review={selectedReview}
          />
        )}
      </div>
    </div>
  );
}
