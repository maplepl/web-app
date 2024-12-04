// models/itemModel.js

const sqlite3 = require('sqlite3').verbose();

// Initialize SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    }
});

// Get all items
const getItems = (callback) => {
    db.all('SELECT * FROM items', callback);
};

// Add a new item
const addItem = (name, description, callback) => {
    db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], callback);
};

// Update an item
const updateItem = (id, name, description, callback) => {
    db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], callback);
};

// Delete an item
const deleteItem = (id, callback) => {
    db.run('DELETE FROM items WHERE id = ?', [id], callback);
};

module.exports = {
    getItems,
    addItem,
    updateItem,
    deleteItem
};
