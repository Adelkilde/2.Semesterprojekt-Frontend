import { useEffect, useState } from "react";

export default function WorkForm({ saveWork, work }) {
  const [title, setTitle] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setTitle(work.title);
    setPublicationDate(work.publicationDate);
    setPublisher(work.publisher);
    setDescription(work.description);
    setImage(work.image);
  }, [work]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      title: title,
      publicationDate: publicationDate,
      publisher: publisher,
      description: description,
      image: image,
    };
    saveWork(formData);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titel
        <input
          type="text"
          value={title}
          placeholder="Titel"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Udgivelsesdato
        <input
          type="date"
          value={publicationDate}
          placeholder="Udgivelsesdato"
          onChange={(e) => setPublicationDate(e.target.value)}
        />
      </label>
      <label>
        Forlag
        <input
          type="text"
          value={publisher}
          placeholder="Forlag"
          onChange={(e) => setPublisher(e.target.value)}
        />
      </label>
      <label>
        Beskrivelse
        <input
          type="text"
          value={description}
          placeholder="Beskrivelse"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Billede
        <input
          type="text"
          value={image}
          placeholder="Billede"
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <button type="submit">Gem værk</button>
    </form>
  );
}
