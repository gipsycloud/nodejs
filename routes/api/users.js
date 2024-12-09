const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let users = require('../../Users');

router.get('/', (req, res) => {
  console.log(req.query);

  res.json(users);
});

module.exports = router;