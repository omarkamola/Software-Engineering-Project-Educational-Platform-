import pool from './src/config/db';
import bcrypt from 'bcryptjs';

async function reset(username: string, pass: string) {
    const hash = await bcrypt.hash(pass, 10);
    await pool.query('UPDATE users SET password_hash = ? WHERE username = ?', [hash, username]);
    console.log(`Reset ${username} success`);
}

(async () => {
    await reset('admin', 'admin123');
    await reset('teacher1', 'password123');
    await reset('student1', 'password123');
    process.exit();
})();
