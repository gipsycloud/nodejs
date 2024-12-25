const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// define route
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      completed: false,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      priority: req.body.priority
    })
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
})

//get todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update todo
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(res.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.completed = req.body.completed
    todo.title = req.body.title
    todo.description = req.body.description
    todo.status = req.body.status
    todo.dueDate = req.body.dueDate
    todo.priority = req.body.priority
    await todo.save();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    await todo.remove();
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// define routes here
module.exports = router;