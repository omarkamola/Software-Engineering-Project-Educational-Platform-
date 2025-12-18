import { Router } from 'express';
import { check } from 'express-validator';
import { enrollInCourse, getMyEnrollments } from '../controllers/enrollmentController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// All routes require authentication
router.post(
  '/',
  authenticateToken,
  [check('course_id', 'Course ID is required').isNumeric()],
  enrollInCourse
);

router.get('/my-enrollments', authenticateToken, getMyEnrollments);

export default router;
