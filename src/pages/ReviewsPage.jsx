import { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [data, setData] = useState({ reviews: [], works: [] });

  useEffect(() => {
    async function fetchReviewsAndWorks() {
      try {
        // Initiate multiple API requests simultaneously
        const [reviewsResponse, worksResponse] = await Promise.all([
          fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/reviews"),
          fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/works"),
        ]);

        // Extract JSON data from each response
        const reviewsData = await reviewsResponse.json();
        const worksData = await worksResponse.json();

        // Update state with the combined data
        setData({
          reviews: Object.keys(reviewsData).map((key) => ({ id: key, ...reviewsData[key] })),
          works: Object.keys(worksData).map((key) => ({ id: key, ...worksData[key] })),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchReviewsAndWorks();
  }, []);

  const { reviews, works } = data;

  return (
    <div className="container mt-5">
      <h1>Anmeldelser</h1>
      <ul className="list-group">
        {reviews.map((review) => {
          // Find the work object with the matching id
          const work = works.find((work) => work.work_id === review.work_id);

          const stars = Array.from({ length: review.rating }, (_, index) => (
            <span key={index} role="img" aria-label="star">
              ⭐
            </span>
          ));

          return (
            <li key={review.id} className="list-group-item">
              <p className="mb-1 h3">{work ? work.title : "Loading..."}</p>
              <p className="mb-1 h5">{stars}</p>
              <p className="mb-1">{review.review_text}</p>
              <p className="mb-1">
                Af <strong>{review.name}</strong>
              </p>
              <p className="mb-1">
                {new Date(review.createdAt)
                  .toLocaleDateString("da-DK", { day: "2-digit", month: "2-digit", year: "numeric" })
                  .split(".")
                  .join("/")}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
