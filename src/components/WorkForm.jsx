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
}
