// import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ContactMeForm from "../components/ContactMeEditor";

// export default function ManageContactMePage() {
//     const [contactmes, setContactMes] = useState([]);
//     const [selectedContactMe, setSelectedContactMe] = useState(null);
    
//     async function fetchContactMe() {
//         try {
//         const url =
//             "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/contactmes";
//         const response = await fetch(url);
//         const data = await response.json();
//         setContactMes(data);
//         } catch (error) {
//         console.error("An error occurred:", error);
//         }
//     }
    
//     useEffect(() => {
//         fetchContactMe();
//     }, []);
    
//     const handleEditContactMe = (contactme) => {
//         setSelectedContactMe(contactme);
//     };
    
//     const handleCancelEditContactMe = () => {
//         setSelectedContactMe(null);
//     };
    
//     const fetchOptions = (method, body) => ({
//         method,
//         headers: {
//         "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//     });
    
//     const handleSaveContactMe = async (formData) => {
//         const url = selectedContactMe
//         ? `https://semesterprojekt2-deployment-with-azure.azurewebsites.net/contactmes/${selectedContactMe.contactme_id}`
//         : "https://semesterprojekt2-deployment-with-azure.azurewebsites.net/contactmes";
    
//         const method = selectedContactMe ? "PUT" : "POST";
    
//         try {
//         const response = await fetch(
//             url,
//             fetchOptions(method, {
//             name: formData.name,
//             email: formData.email,
//             message: formData.message,
//             })
//         );
    
//         if (response.ok) {
//             console.log("ContactMe updated successfully");
//             // Fetch the updated list of contactmes
//             fetchContactMe();
//             setSelectedContactMe(null);
//         } else {
//             console.error("An error occurred");
//         }
//         } catch (error) {
//         console.error("An error occurred:", error);
//         }
//     };
    
//     const handleDeleteContactMe = async (contactme) => {
//         const url = `https://semesterprojekt2-deployment-with-azure.azurewebsites.net/contactmes/${contactme.contactme_id}`;
    
//         try {
//         const response = await fetch(url, { method: "DELETE" });
    
//         if (response.ok) {
//             console.log("ContactMe deleted successfully");
//             // Fetch the updated list of contactmes
//             fetchContactMe();
//         } else {
//             console.error("An error occurred");
//         }
//     } catch (error) {
//         console.error("An error occurred:", error);
//     }  
//     }; 

//   const handleCancelEdit = () => {
//     setSelectedAuthor(null);
//   };

//     return (
//         <div id="authorForm" className="container mt-5">
//         <h1>Kontakt Oplysninger</h1>
        
//         {selectedAuthor && (
//         <ContactMeEditor handleSaveContactMe={handleSaveAuthor} onCancelEdit={handleCancelEdit} aboutMe={selectedAuthor} />
//       )}
//       </div>
//     )
// }