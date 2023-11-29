// import React, { useEffect, useState } from 'react'

// function App() {

//   const [backendData, setBackendData] = useState([{}])
  
//   useEffect(() => {
//     fetch("/api").then(
//       response => response.json()
//     ).then(
//       data => {
//        setBackendData(data);
//      }
//    )
//   }, [])

//   return (
//     <div>

//       {(typeof backendData.users === 'undefined') ? (
//         <p>Loading...</p>
//       ):(
//         backendData.users.map((user, index) => (
//           <p key={index}>{user}</p>
//         ))
//       )}
//     </div>
//   )
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authors, setAuthors] = useState([]);
  const [works, setWorks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [contactMe, setContactMe] = useState([]);
  const [news, setNews] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for authors
        const authorsResponse = await axios.get('/api/authors');
        setAuthors(authorsResponse.data);

        // Fetch data for works
        const worksResponse = await axios.get('/api/works');
        setWorks(worksResponse.data);

        // Fetch data for reviews
        const reviewsResponse = await axios.get('/api/reviews');
        setReviews(reviewsResponse.data);

        // Fetch data for contactMe
        const contactMeResponse = await axios.get('/api/contactMe');
        setContactMe(contactMeResponse.data);

        // Fetch data for news
        const newsResponse = await axios.get('/api/news');
        setNews(newsResponse.data);

        // Fetch data for socialMedia
        const socialMediaResponse = await axios.get('/api/socialMedia');
        setSocialMedia(socialMediaResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors if necessary
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Display authors */}
      <h2>Authors:</h2>
      <ul>
        {authors.map((author, index) => (
          <li key={index}>{author.name}</li>
        ))}
      </ul>

      {/* Display works */}
      <h2>Works:</h2>
      <ul>
        {works.map((work, index) => (
          <li key={index}>{work.title}</li>
        ))}
      </ul>

      {/* Display reviews, contactMe, news, socialMedia similarly */}
      {/* ... */}
    </div>
  );
}

export default App;


