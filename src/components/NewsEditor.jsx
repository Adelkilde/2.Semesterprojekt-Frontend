import { useEffect, useState } from "react";

export default function NewsEditor({
  saveNews,
  onCancelEdit,
  news,
  onCancelCreate,
}) {
  const [formData, setFormData] = useState({
    author_id: "1",
    news_id: "",
    headline: "",
    content: "",
  });
  useEffect(() => {
    if (news) {
      setFormData({
        headline: news.headline || "",
        content: news.content || "",
      });
    }
  }, [news]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveNews(formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      headline: "",
      content: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Overskrift
        <input
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
        />
      </label>
      <label>
        Brødtekst
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Gem</button>
      {news && (
        <button type="button" onClick={onCancelEdit}>
          {" "}
          Annuller ændringer{" "}
        </button>
      )}

      {!news && (
        <button type="button" onClick={onCancelCreate}>
          Annuller oprettelse
        </button>
      )}
    </form>
  );
}
