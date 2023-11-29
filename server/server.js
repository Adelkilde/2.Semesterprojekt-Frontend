// const express   = require('express');
// const app       = express();   

// app.get('/', (require, response) => {
//   response.json(({"users": [{"name": "John", "age": 22}, {"name": "Peter", "age": 33}]}))
// });

// app.listen(5000, () => {
//   console.log('Example app listening on port 3000!');
// });

_______________________________________________________________________________________________________________
const express = require('express');
const axios = require('axios');
const app = express();

// Define a route to fetch data from the backend
app.get('/', async (req, res) => {
  try {
    // Make a GET request to your backend API
    const backendResponse = await axios.get('https://semesterprojekt2-deployment-with-azure.azurewebsites.net/');

    // Assuming the response data structure is similar to your JSON example
    const usersData = backendResponse.data.users;

    // Send the fetched data as a response
    res.json({ users: usersData });
  } catch (error) {
    // Handle errors if the request to the backend fails
    res.status(500).json({ error: 'Failed to fetch data from the backend' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
