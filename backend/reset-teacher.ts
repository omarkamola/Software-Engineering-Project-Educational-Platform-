import pool from './src/config/db';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the standard location
dotenv.config({ path: path.join(__dirname, '.env') });

async function resetPassword(username: string, newPassword: string) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        
        console.log(`Setting password for ${username} to: ${newPassword}`);
        console.log(`Generated hash: ${hash}`);

        const [result]: any = await pool.query(
            'UPDATE users SET password_hash = ? WHERE username = ?',
            [hash, username]
        );

        if (result.affectedRows > 0) {
            console.log(`Successfully updated password for ${username}`);
        } else {
            console.log(`User ${username} not found!`);
            
            // Try to create the user if it doesn't exist
            console.log(`Attempting to create teacher1...`);
            await pool.query(
                'INSERT INTO users (username, password_hash, full_name, role_id, email) VALUES (?, ?, ?, ?, ?)',
                ['teacher1', hash, 'أستاذ أحمد فيزياء', 3, 'teacher1@example.com']
            );
            console.log(`Created teacher1 successfully.`);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
}

(async () => {
    await resetPassword('teacher1', 'password123');
    await resetPassword('student1', 'password123');
})();
