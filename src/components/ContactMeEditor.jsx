import { useEffect, useState } from "react";

export default function ContactMeEditor({ saveContactMe, onCancelEdit, contactme }) {
    const [formData, setFormData] = useState({
        contactme_id: "",
        name: "",
        email: "",
        message: "",
    });
    useEffect(() => {
        if (contactme) {
        setFormData({
            name: contactme.name || "",
            email: contactme.email || "",
            message: contactme.message || "",
        });
        }
    }, [contactme]);
    
    const handleChange = (event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        saveContactMe(formData);
        resetForm();
    };
    const handleCancelEditForm = () => {
        onCancelEdit();
        resetForm();
    };
    
    const resetForm = () => {
        setFormData({
        name: "",
        email: "",
        message: "",
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
        <label>
            Name
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            />
        </label>
        <label>
            Email
            <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
        </label>
        <label>
            Message
            <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelEditForm}>
            Cancel
        </button>
        </form>
    );
}