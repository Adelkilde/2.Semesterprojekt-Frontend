import { useEffect, useState } from "react";

export default function AboutMeEditor({ saveAboutMe, onCancelEdit, aboutMe }) {
  const [formData, setFormData] = useState({
    author_id: "1",
    biography: "",
    image: "",
  });

  useEffect(() => {
    if (aboutMe) {
      setFormData({
        author_id: aboutMe.author_id,
        biography: aboutMe.biography,
        image: aboutMe.image,
      });
    }
  }, [aboutMe]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveAboutMe(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Billede URL
        <input type="text" name="image" value={formData.image} onChange={handleChange} />
      </label>
      <label>
        Biografi
        <textarea name="biography" value={formData.biography} onChange={handleChange} />
      </label>
      <button type="submit">Gem ændringer</button>
      <button type="button" onClick={onCancelEdit}> Annuller ændringer </button>
    </form>
  );
}
