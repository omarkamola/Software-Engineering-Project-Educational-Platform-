import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

async function initDb() {
    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    };

    try {
        // Connect without database selected
        const conn = await mysql.createConnection(config);
        console.log('Connected to MySQL server.');

        // Create DB
        await conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log(`Database ${process.env.DB_NAME} created/verified.`);
        
        await conn.changeUser({ database: process.env.DB_NAME });

        // Read and Run Schema
        const schemaPath = path.join(__dirname, '../../../schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        console.log('Running Schema...');
        await conn.query(schema);
        console.log('Schema imported successfully.');

        await conn.end();
    } catch (err) {
        console.error('Database Initialization Failed:', err);
    }
}

initDb();
