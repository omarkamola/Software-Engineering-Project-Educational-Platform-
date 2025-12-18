import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { AuthenticatedRequest } from '../types';

export const createCourse = async (req: AuthenticatedRequest, res: Response) => {
    // Validate Input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if user is authenticated and is a teacher (role_id = 3) or admin (role_id = 5)
    if (!req.user || (req.user.role_id !== 3 && req.user.role_id !== 5)) {
        return res.status(403).json({ message: 'Access denied. Only teachers can create courses.' });
    }

    const { title, description, grade, subject, price, thumbnail_url } = req.body;

    try {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO courses (teacher_id, title, description, grade, subject, price, thumbnail_url, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [req.user.id, title, description, grade, subject, price, thumbnail_url || null, true] // Default published for now
        );

        res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });

    } catch (error) {
        console.error('Create Course Error:', error);
        res.status(500).json({ message: 'Server error during course creation' });
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const [courses] = await pool.query<RowDataPacket[]>(
            'SELECT c.*, u.full_name as teacher_name FROM courses c JOIN users u ON c.teacher_id = u.id WHERE c.is_published = 1 ORDER BY c.created_at DESC'
        );
        res.json(courses);
    } catch (error) {
        console.error('Get Courses Error:', error);
        res.status(500).json({ message: 'Server error fetching courses' });
    }
};

export const getCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [courses] = await pool.query<RowDataPacket[]>(
            'SELECT c.*, u.full_name as teacher_name FROM courses c JOIN users u ON c.teacher_id = u.id WHERE c.id = ?',
            [id]
        );

        if (courses.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json(courses[0]);
    } catch (error) {
        console.error('Get Course Error:', error);
        res.status(500).json({ message: 'Server error fetching course' });
    }
};
