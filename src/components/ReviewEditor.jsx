import { useEffect, useState } from "react";

export default function ReviewEditor({ saveReview, onCancelEdit, review }) {
  const [formData, setFormData] = useState({
    review_id: "",
    work_id: "",
    name: "",
    email: "",
    review_text: "",
    rating: "",
  });
  useEffect(() => {
    if (review) {
      setFormData({
        work_id: review.work_id || "",
        name: review.name || "",
        email: review.email || "",
        review_text: review.review_text || "",
        rating: review.rating || "",
      });
    }
  }, [review]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveReview(formData);
    resetForm();
  };
  const handleCancelEditForm = () => {
    onCancelEdit();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      work_id: "",
      name: "",
      email: "",
      text: "",
      rating: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Work ID
        <input type="text" name="work_id" value={formData.work_id} onChange={handleChange} />
      </label>
      <label>
        Name
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Review Text
        <input type="text" name="review_text" value={formData.review_text} onChange={handleChange} />
      </label>
      <label>
        Rating
        <input type="text" name="rating" value={formData.rating} onChange={handleChange} />
      </label>
      <button type="submit">Submit Review</button>
      <button type="button" onClick={handleCancelEditForm}>
        Cancel Edit
      </button>
    </form>
  );
}
