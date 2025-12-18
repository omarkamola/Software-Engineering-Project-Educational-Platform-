import { Router } from 'express';
import { check } from 'express-validator';
import { register, login } from '../controllers/authController';

const router = Router();

// Register Route
router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
        check('full_name', 'Full name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('role_id', 'Role ID is required').isNumeric()
    ],
    register
);

// Login Route
router.post('/login', login);

export default router;
