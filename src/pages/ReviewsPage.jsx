import { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const url = "http://localhost:3333/reviews";
      const response = await fetch(url);
      const data = await response.json();
      const reviewsArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      setReviews(reviewsArray);
    }
    getReviews();
  }, []);
  console.log("Reviews page");

  return console.log(reviews);
}
