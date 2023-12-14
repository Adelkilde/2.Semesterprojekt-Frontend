import { useEffect, useState } from "react";
import FormatDate from "../components/FormatDate";

export default function ReviewsPage() {
  const [data, setData] = useState({ reviews: [], works: [] });

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

  return (
    <div className="container mt-5">
      <h1>Anmeldelser</h1>
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
              <p className="mb-1 h3">{work ? work.title : "Loading..."}</p>
              <p className="mb-1 h5">{stars}</p>
              <p className="mb-1">{review.review_text}</p>
              <p className="mb-1">
                Af <strong>{review.name}</strong>
              </p>
              <p className="mb-1">
                <FormatDate dateString={new Date(review.createdAt).toISOString().split("T")[0]} />
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
