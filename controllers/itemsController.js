// controllers/itemController.js

const db = require('../models/itemModel');

// Get all items
const getAllItems = (req, res) => {
    db.getItems((err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching items' });
        } else {
            res.json(rows);
        }
    });
};

// Create a new item
const createItem = (req, res) => {
    const { name, description } = req.body;
    db.addItem(name, description, (err) => {
        if (err) {
            res.status(500).json({ message: 'Error adding item' });
        } else {
            res.status(201).json({ message: 'Item added' });
        }
    });
};

// Update an existing item
const updateItem = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.updateItem(id, name, description, (err) => {
        if (err) {
            res.status(500).json({ message: 'Error updating item' });
        } else {
            res.json({ message: 'Item updated' });
        }
    });
};

// Delete an item
const deleteItem = (req, res) => {
    const { id } = req.params;
    db.deleteItem(id, (err) => {
        if (err) {
            res.status(500).json({ message: 'Error deleting item' });
        } else {
            res.json({ message: 'Item deleted' });
        }
    });
};

module.exports = {
    getAllItems,
    createItem,
    updateItem,
    deleteItem
};
