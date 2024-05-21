const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to get JSON data
app.get('/data', (req, res) => {
  fs.readFile(path.join(__dirname, 'itemBranch.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the JSON file');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
