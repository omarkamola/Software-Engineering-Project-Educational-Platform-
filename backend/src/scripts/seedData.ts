import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

async function seedData() {
  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  try {
    const conn = await mysql.createConnection(config);
    console.log('Connected to database.');

    // Create test users
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Teacher
    await conn.query(
      `INSERT INTO users (username, password_hash, full_name, role_id, email, phone) 
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE username=username`,
      ['teacher_test', hashedPassword, 'أستاذ محمد التجريبي', 3, 'teacher@test.com', '01012345678']
    );

    // Student
    await conn.query(
      `INSERT INTO users (username, password_hash, full_name, role_id, email, phone) 
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE username=username`,
      ['student_test', hashedPassword, 'أحمد الطالب التجريبي', 1, 'student@test.com', '01087654321']
    );

    // Parent
    await conn.query(
      `INSERT INTO users (username, password_hash, full_name, role_id, email, phone) 
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE username=username`,
      ['parent_test', hashedPassword, 'ولي أمر تجريبي', 2, 'parent@test.com', '01098765432']
    );

    // Assistant
    await conn.query(
      `INSERT INTO users (username, password_hash, full_name, role_id, email, phone) 
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE username=username`,
      ['assistant_test', hashedPassword, 'مساعد تجريبي', 4, 'assistant@test.com', '01054321098']
    );

    console.log('✅ Test users created successfully.');
    console.log('   username: teacher_test, password: password123');
    console.log('   username: student_test, password: password123');
    console.log('   username: parent_test, password: password123');
    console.log('   username: assistant_test, password: password123');

    await conn.end();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  }
}

seedData();
