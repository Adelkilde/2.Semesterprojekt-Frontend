import { useEffect, useState } from "react";

export default function WorkEditor({ saveWork, onCancelEdit, onCancelCreate, work }) {
  const [formData, setFormData] = useState({
    author_id: "1",
    title: "",
    publication_date: "",
    publisher: "",
    description: "",
    image: "",
  });

  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = () => {
      const url = "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/author";
      return fetch(url).then((response) => response.json());
    };

    fetchAuthor()
      .then((authorData) => {
        setAuthor(authorData);
      })
      .catch((error) => {
        console.error("Error fetching author:", error);
      });
  }, []);

  useEffect(() => {
    if (work) {
      setFormData({
        author_id: work.author_id || "",
        title: work.title || "",
        publication_date: work.publication_date || "",
        publisher: work.publisher || "",
        description: work.description || "",
        image: work.image || "",
      });
    }
  }, [work]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveWork(formData);
    resetForm();
  };

  const handleCancelEditForm = () => {
    onCancelEdit();
    resetForm();
  };

  const handleCancelCreateForm = () => {
    onCancelCreate();
    resetForm();
  };
  const resetForm = () => {
    setFormData({
      author_id: "",
      title: "",
      publication_date: "",
      publisher: "",
      description: "",
      image: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Forfatter
        <select name="author_id" value={formData.author_id} onChange={handleChange}>
          {author &&
            author.map((author) => (
              <option key={author.author_id} value={author.author_id}>
                {author.name}
              </option>
            ))}
        </select>
      </label>
      <label>
        Titel
        <input type="text" name="title" value={formData.title} placeholder="Titel" onChange={handleChange} />
      </label>
      <label>
        Udgivelsesdato
        <input
          type="date"
          name="publication_date"
          value={formData.publication_date}
          placeholder="Udgivelsesdato"
          onChange={handleChange}
        />
      </label>
      <label>
        Forlag
        <input type="text" name="publisher" value={formData.publisher} placeholder="Forlag" onChange={handleChange} />
      </label>
      <label>
        Beskrivelse
        <textarea name="description" value={formData.description} placeholder="Beskrivelse" onChange={handleChange} />
      </label>
      <label>
        Billede
        <input type="text" name="image" value={formData.image} placeholder="Billede" onChange={handleChange} />
      </label>
      <button type="submit">{work ? "Opdater værk" : "Opret værk"}</button>
      {work && (
        <button type="button" onClick={handleCancelEditForm}>
          Annuller ændringer
        </button>
      )}

      {!work && (
        <button type="button" onClick={handleCancelCreateForm}>
          Annuller oprettelse
        </button>
      )}
    </form>
  );
}
