const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

// Putanja do .txt datoteke
const filePath = 'passwords/passwords.txt';
app.use(cors());

app.listen(port, () => {
    console.log(`Server sluša na portu ${port}`);
});
