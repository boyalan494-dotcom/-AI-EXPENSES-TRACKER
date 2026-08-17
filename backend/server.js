// server.js
// This is our backend API for the AI Expense Tracker.
// Day 3: in-memory storage only (no database yet — that's Day 4)

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// --- Middleware ---
// Lets our server understand JSON sent from the frontend
app.use(express.json());
// Lets our frontend (running from a different origin, like a file:// page)
// talk to this server without being blocked by the browser
app.use(cors());

// --- Temporary "database" ---
// Just a plain array in memory. It resets every time the server restarts.
// On Day 4 this gets replaced by MongoDB.
let expenses = [];
let nextId = 1;

// --- Root route, just to confirm the server is alive ---
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running ✅');
});

// --- GET /api/expenses ---
// Returns every expense we currently have
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// --- POST /api/expenses ---
// Adds a new expense. Expects JSON body: { amount, category, description, date }
app.post('/api/expenses', (req, res) => {
  const { amount, category, description, date } = req.body;

  // basic validation — reject the request if required fields are missing
  if (amount === undefined || !category || !date) {
    return res.status(400).json({
      error: 'amount, category, and date are required'
    });
  }

  const newExpense = {
    id: nextId++,
    amount: Number(amount),
    category,
    description: description || '',
    date
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// --- DELETE /api/expenses/:id ---
// Removes one expense by its id
app.delete('/api/expenses/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = expenses.findIndex(exp => exp.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  const deleted = expenses.splice(index, 1)[0];
  res.json({ message: 'Deleted successfully', deleted });
});

// --- Start the server ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});