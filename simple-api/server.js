const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
// Middlewares
app.use(cors());
app.use(bodyParser.json());
// Simulated database
let items = [];
// Routes
// GET: Retrieve all items
app.get('/items', (req, res) => {
  res.json(items);
});
// POST: Add a new item
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (name) {
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem);
  } else {
    res.status(400).json({ error: 'Name is required' });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// DELETE: Remove an item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((item) => item.id === id);

  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    res.json(deletedItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});
