const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    }
});

// Set up body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for the web interface
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

// CRUD Operations
app.get('/items', (req, res) => {
    db.all('SELECT * FROM items', (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
        } else {
            res.json(rows);
        }
    });
});

app.post('/items', (req, res) => {
    const { name, description } = req.body;
    db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], function(err) {
        if (err) {
            res.status(500).json({ message: 'Error adding item' });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], function(err) {
        if (err) {
            res.status(500).json({ message: 'Error updating item' });
        } else {
            res.json({ message: 'Item updated' });
        }
    });
});

app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM items WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ message: 'Error deleting item' });
        } else {
            res.json({ message: 'Item deleted' });
        }
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
