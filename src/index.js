const express = require('express');
const mongoose = require('mongoose');

const crypto = require('crypto');
global.crypto = crypto;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/todos');

const Todo = mongoose.model('Todo', {
  title: String,
  completed: Boolean
});

// CREATE
app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.send(todo);
});

// READ ALL
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

// READ ONE
app.get('/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.send(todo);
});

// UPDATE
app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(todo);
});

// DELETE
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send({ message: 'Deleted' });
});

app.listen(3000, () => console.log("Server running"));
