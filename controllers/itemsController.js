const db = require('../models/db');

// Get all items
exports.getAllItems = (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.render('index', { items: rows });
    });
};

// Add new item
exports.addItem = (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).send('Name is required');
    const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
    db.run(sql, [name, description], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/');
    });
};

// Update item
exports.updateItem = (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
    db.run(sql, [name, description, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/');
    });
};

// Partially update item
exports.partialUpdateItem = (req, res) => {
    const updates = Object.keys(req.body).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(req.body), req.params.id];
    const sql = `UPDATE items SET ${updates} WHERE id = ?`;
    db.run(sql, values, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/');
    });
};

// Delete item
exports.deleteItem = (req, res) => {
    const sql = 'DELETE FROM items WHERE id = ?';
    db.run(sql, [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/');
    });
};
