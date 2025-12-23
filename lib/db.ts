if (typeof window !== 'undefined') {
    throw new Error('Database module cannot be imported in a Client Component');
}

import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { mkdirSync } from 'fs';

const dbPath = join(process.cwd(), 'data', 'trades.db');

// Ensure the directory exists
mkdirSync(dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    month TEXT NOT NULL,
    pair TEXT NOT NULL,
    profit REAL DEFAULT 0,
    loss REAL DEFAULT 0
  )
`);

export default db;