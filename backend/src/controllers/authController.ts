import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { UserPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_change_in_production';

export const register = async (req: Request, res: Response) => {
    // Validate Input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, full_name, role_id, email, phone } = req.body;

    try {
        // Check if user already exists
        const [existingUsers] = await pool.query<RowDataPacket[]>(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'User already exists (username or email)' });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insert User
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO users (username, password_hash, full_name, role_id, email, phone) VALUES (?, ?, ?, ?, ?, ?)',
            [username, password_hash, full_name, role_id, email, phone]
        );

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });

    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find User
        const [users] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = users[0];

        // Check Password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate Token
        const payload: UserPayload = {
            id: user.id,
            username: user.username,
            role_id: user.role_id
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

        res.json({ token, user: { id: user.id, username: user.username, full_name: user.full_name, role_id: user.role_id } });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};
