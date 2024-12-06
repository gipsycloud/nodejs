const express = require('express');
const Corona = require('../models/Corona');
const router = express.Router();

// Create a new
router.post('/', async (req, res) => {
  console.log(req.body);
  
  try {
    const corona = new Corona(req.body);
    const newCorona = await corona.save();
    res.status(201).json(newCorona);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const coronas = await Corona.find();
    res.status(200).json(coronas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;