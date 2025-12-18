import { Router } from 'express';
import { check } from 'express-validator';
import { createCourse, getAllCourses, getCourseById } from '../controllers/courseController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Public Routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected Routes (Teacher Only)
router.post(
    '/',
    authenticateToken,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('grade', 'Grade is required').not().isEmpty(),
        check('subject', 'Subject is required').not().isEmpty(),
        check('price', 'Price must be a number').isNumeric()
    ],
    createCourse
);

export default router;
