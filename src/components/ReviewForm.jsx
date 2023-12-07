import { useEffect, useState } from "react";
export default function ReviewForm({ saveReview, review }) {
  const [workId, setWorkId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (
      review?.workId &&
      review?.name &&
      review?.email &&
      review?.reviewText &&
      review?.rating
    ) {
      setWorkId(review.workId);
      setName(review.name);
      setEmail(review.email);
      setReviewText(review.reviewText);
      setRating(review.rating);
    }
  }, [review]);
  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      work_id: workId,
      name: name,
      email: email,
      review_text: reviewText,
      rating: rating,
    };
    const validForm =
      formData.work_id &&
      formData.name &&
      formData.email &&
      formData.review_text &&
      formData.rating;
    if (validForm) {
      saveReview(formData);
    } else {
      setErrorMessage("Udfyld alle felter");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Værk ID
        <input
          type="number"
          value={workId}
          placeholder="Værk ID"
          onChange={(e) => setWorkId(e.target.value)}
        />
      </label>
      <label>
        Anmelders navn
        <input
          type="text"
          value={name}
          placeholder="Anmelders navn"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Anmelders email
        <input
          type="text"
          value={email}
          placeholder="Anmelders email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Anmeldelse
        <input
          type="text"
          value={reviewText}
          placeholder="Anmeldelse"
          onChange={(e) => setReviewText(e.target.value)}
        />
      </label>
      <label>
        Stjerner
        <input
          type="number"
          value={rating}
          placeholder="Stjerner"
          onChange={(e) => setRating(e.target.value)}
        />
      </label>
      <p className="text-error">{errorMessage}</p>
      <button type="submit">Gem Anmeldelse</button>
    </form>
  );
}
