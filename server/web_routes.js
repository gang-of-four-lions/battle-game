"use strict";
const express = require('express');
const app = express();
const path = require('path');

var router = express.Router();
app.use(express.static(path.join(__dirname, '..', 'client')));

router.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

module.exports = router;