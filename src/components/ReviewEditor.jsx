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

  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch("https://semesterprojekt2-deployment-with-azure.azurewebsites.net/works");
        const worksData = await response.json();
        setWorks(worksData);
      } catch (error) {
        console.error("Error fetching works:", error);
        throw error;
      }
    };

    fetchWorks(); // Kalder funktionen her
  }, []);

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
      review_text: "",
      rating: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Værk
        <select name="work_id" value={formData.work_id} onChange={handleChange}>
          <option value="" disabled>
            Vælg et værk
          </option>
          {works.map((work) => (
            <option key={work.work_id} value={work.work_id}>
              {work.title}
            </option>
          ))}
        </select>
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
      <button type="submit">{review ? "Opdater review" : "Opret review"}</button>
      {review && (
        <button type="button" onClick={handleCancelEditForm}>
          Annuller ændringer
        </button>
      )}
    </form>
  );
}
