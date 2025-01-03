const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let users = require('../../Users');

router.get('/', (req, res) => {
  console.log(req.query);

  res.json(users);
});

router.get('/:id', async (req, res) => {
  const found = await users.some(user => user.id === parseInt(req.params.id));
  if (found) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  } else {
    res.sendStatus(400);
  }
});

// create a new user
router.post('/', (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email
  }
  if (!newUser.name || !newUser.email) {
    return res.sendStatus(400);
  }
  users.push(newUser);
  res.json(users);
});

// update user
router.put('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));
  if (found) {
    const user = users.find(user => user.id === parseInt(req.params.id));
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email ? req.body.email : user.email;
    res.json({ msg: 'User updated', users });
  } else {
    res.sendStatus(400);
  }
});

//delete user from
router.delete('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));
  if (found) {
    users = users.filter(user => user.id !== parseInt(req.params.id));
    res.json({ msg: 'User deleted', users });
  } else {
    res.sendStatus(400);
  }
});

// jwt token


module.exports = router;