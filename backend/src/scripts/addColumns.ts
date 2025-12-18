import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function addColumns() {
  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  try {
    const conn = await mysql.createConnection(config);
    console.log('Connected to database.');

    // Add columns if they don't exist
    await conn.query(`
      ALTER TABLE courses 
      ADD COLUMN IF NOT EXISTS grade VARCHAR(50),
      ADD COLUMN IF NOT EXISTS subject VARCHAR(50)
    `);

    console.log('✅ Columns added successfully!');
    await conn.end();
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

addColumns();
