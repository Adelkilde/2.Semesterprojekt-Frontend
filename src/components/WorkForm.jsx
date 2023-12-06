import { useEffect, useState } from "react";

export default function WorkForm({ saveWork, onCancelEdit, work }) {
  const [formData, setFormData] = useState({
    author_id: "", // Updated to match the Sequelize model
    title: "",
    publication_date: "", // Updated to match the Sequelize model
    publisher: "",
    description: "",
    image: "",
  });

  const [author, setAuthor] = useState(null); // Change to null to handle loading state

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveWork(formData);
    resetForm();
  };

  const handleCancelEditForm = () => {
    onCancelEdit(); // Call onCancelEdit to clear the selected work
    resetForm(); // Call resetForm after clearing the selected work
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
          <option value="" disabled>
            Vælg forfatter
          </option>
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
          name="publication_date" // Updated to match the Sequelize model
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
        <input
          type="text"
          name="description"
          value={formData.description}
          placeholder="Beskrivelse"
          onChange={handleChange}
        />
      </label>
      <label>
        Billede
        <input type="text" name="image" value={formData.image} placeholder="Billede" onChange={handleChange} />
      </label>
      <button type="submit">{work ? "Opdater værk" : "Opret værk"}</button>
      {work && (
        <button type="button" onClick={handleCancelEditForm}>
          Annuller Redigering
        </button>
      )}
    </form>
  );
}
