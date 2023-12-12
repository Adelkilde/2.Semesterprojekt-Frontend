import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewForm from "../components/ReviewEditor";

export default function ManageReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);

  async function fetchReview() {
    try {
      const url = "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews";
      const response = await fetch(url);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  useEffect(() => {
    fetchReview();
  }, []);

  const handleEditReview = (review) => {
    setSelectedReview(review);
    handleOpenEditForm();
  };

  const handleCancelEditReview = () => {
    setSelectedReview(null);
  };

  const fetchOptions = (method, body) => ({
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const handleSaveReview = async (formData) => {
    const url = selectedReview ? `https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews/${selectedReview.review_id}` : "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews";

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
        fetchReview();
        handleCancelEditReview(); // Clear selectedReview after saving
      } else {
        console.log(selectedReview ? "Error updating review" : "Error creating new review");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleOpenCreateForm = () => {
    setCreateFormOpen(true);
  };

  const handleCloseCreateForm = () => {
    setCreateFormOpen(false);
  };

  const handleOpenEditForm = () => {
    setEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setEditFormOpen(false);
  };

  return (
    <div className="container mt-5">
      <h1>Reviews </h1>
      <div>
        <button onClick={handleOpenCreateForm}>Create Review</button>
        {/* Display the list of reviews */}
        <ul className="list-group">
          {reviews.map((review) => (
            <li key={review.review_id}>
              <p className="mb-1">
                {review.name}: {review.review_text}
              </p>
              <p className="mb-1">{review.rating}</p>
              <button
                onClick={() => {
                  handleEditReview(review);
                }}
              >
                ændre
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {isCreateFormOpen && <ReviewForm saveReview={handleSaveReview} onCancelEdit={handleCloseCreateForm} review={selectedReview} />}
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
