const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./items.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

module.exports = db;
