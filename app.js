const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/data', (req, res) => {
  fs.readFile(path.join(__dirname, 'itemBranch.JSON'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      res.status(500).send('Error reading the JSON file');
    } else {
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (parseErr) {
        console.error('Error parsing the JSON file:', parseErr);
        res.status(500).send('Error parsing the JSON file');
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
