#! /usr/bin/env node

const pool = require("./pool");

const SQL = `

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    membership_status VARCHAR(10) CHECK (membership_status IN ('user', 'admin')) NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    author_id INT,
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE SET NULL
);
`;

async function main() {
  console.log("seeding...");
  const client = await pool.connect();
  try {
    console.log("connected...");
    await client.query(SQL);
    console.log("query executed...");
  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    client.release();
    console.log("client released");
  }
  console.log("done");
}

main().catch((err) => console.error("Error in main:", err));
