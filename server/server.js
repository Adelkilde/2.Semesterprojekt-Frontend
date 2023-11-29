const express   = require('express');
const app       = express();   

app.get('/', (require, response) => {
  response.json(({"users": [{"name": "John", "age": 22}, {"name": "Peter", "age": 33}]}))
});

app.listen(5000, () => {
  console.log('Example app listening on port 3000!');
});