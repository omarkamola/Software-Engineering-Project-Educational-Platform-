import { Response } from 'express';
import { validationResult } from 'express-validator';
import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { AuthenticatedRequest } from '../types';

export const enrollInCourse = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.user || req.user.role_id !== 1) {
    return res.status(403).json({ message: 'Only students can enroll in courses' });
  }

  const { course_id } = req.body;
  const student_id = req.user.id;

  try {
    // Check if already enrolled
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?',
      [student_id, course_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Create enrollment
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO enrollments (student_id, course_id, status) VALUES (?, ?, ?)',
      [student_id, course_id, 'active']
    );

    res.status(201).json({ message: 'Enrolled successfully', enrollmentId: result.insertId });
  } catch (error) {
    console.error('Enrollment Error:', error);
    res.status(500).json({ message: 'Server error during enrollment' });
  }
};

export const getMyEnrollments = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const [enrollments] = await pool.query<RowDataPacket[]>(
      `SELECT e.*, c.title, c.description, c.price, u.full_name as teacher_name 
       FROM enrollments e 
       JOIN courses c ON e.course_id = c.id 
       JOIN users u ON c.teacher_id = u.id 
       WHERE e.student_id = ? ORDER BY e.enrolled_at DESC`,
      [req.user.id]
    );

    res.json(enrollments);
  } catch (error) {
    console.error('Get Enrollments Error:', error);
    res.status(500).json({ message: 'Server error fetching enrollments' });
  }
};
