import { useEffect, useState } from "react";

export default function ContactPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function getContacts() {
      const url = "http://localhost:3333/works";
      const response = await fetch(url);
      const data = await response.json();
      const contactsArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      setContacts(contactsArray);
    }
    getContacts();
  }, []);
  console.log("ContactMe page");

  return console.log(contacts);
}
