import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function addColumnsAndSeed() {
  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  try {
    const conn = await mysql.createConnection(config);
    console.log('Connected to database.');

    // Try to add columns (might fail if they already exist, which is OK)
    try {
      await conn.query('ALTER TABLE courses ADD COLUMN grade VARCHAR(50)');
      console.log('✅ Added grade column');
    } catch (e: any) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️  Grade column already exists');
      } else {
        throw e;
      }
    }

    try {
      await conn.query('ALTER TABLE courses ADD COLUMN subject VARCHAR(50)');
      console.log('✅ Added subject column');
    } catch (e: any) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️  Subject column already exists');
      } else {
        throw e;
      }
    }

    // Now seed courses
    const [teachers]: any = await conn.query('SELECT id FROM users WHERE role_id = 3 LIMIT 1');
    const teacherId = teachers[0]?.id || 1;

    const courses = [
      // Primary
      { title: 'رياضيات الصف الأول', description: 'تعلم الأرقام والعد', grade: 'الصف الأول', subject: 'رياضيات', price: 150 },
      { title: 'لغة عربية الصف الأول', description: 'تعلم الحروف والقراءة', grade: 'الصف الأول', subject: 'عربي', price: 150 },
      { title: 'رياضيات الصف الثاني', description: 'الجمع والطرح', grade: 'الصف الثاني', subject: 'رياضيات', price: 180 },
      { title: 'علوم الصف الثاني', description: 'عالم النباتات والحيوانات', grade: 'الصف الثاني', subject: 'علوم', price: 160 },
      { title: 'رياضيات الصف الثالث', description: 'الضرب والقسمة', grade: 'الصف الثالث', subject: 'رياضيات', price: 200 },
      { title: 'English Grade 3', description: 'Basic English', grade: 'الصف الثالث', subject: 'إنجليزي', price: 180 },
      
      // Preparatory
      { title: 'الجبر أولى إعدادي', description: 'المعادلات الخطية', grade: 'أولى إعدادي', subject: 'رياضيات', price: 250 },
      { title: 'العلوم أولى إعدادي', description: 'الفيزياء والكيمياء', grade: 'أولى إعدادي', subject: 'علوم', price: 240 },
      { title: 'الهندسة ثانية إعدادي', description: 'المثلثات والدوائر', grade: 'ثانية إعدادي', subject: 'رياضيات', price: 270 },
      { title: 'التاريخ ثانية إعدادي', description: 'التاريخ الإسلامي', grade: 'ثانية إعدادي', subject: 'دراسات', price: 200 },
      { title: 'الإحصاء ثالثة إعدادي', description: 'الإحصاء والاحتمالات', grade: 'ثالثة إعدادي', subject: 'رياضيات', price: 290 },
      { title: 'الكيمياء ثالثة إعدادي', description: 'التفاعلات الكيميائية', grade: 'ثالثة إعدadي', subject: 'علوم', price: 270 },
      
      // Secondary
      { title: 'الجبر أولى ثانوي', description: 'الدوال والهندسة', grade: 'أولى ثانوي', subject: 'رياضيات', price: 350 },
      { title: 'الفيزياء أولى ثانوي', description: 'الميكانيكا والموجات', grade: 'أولى ثانوي', subject: 'فيزياء', price: 320 },
      { title: 'الأحياء أولى ثانوي', description: 'الخلية والوراثة', grade: 'أولى ثانوي', subject: 'أحياء', price: 300 },
      { title: 'التفاضل والتكامل ثانية ثانوي', description: 'Calculus المتقدم', grade: 'ثانية ثانوي', subject: 'رياضيات', price: 400 },
      { title: 'الكيمياء ثانية ثانوي', description: 'الكيمياء العضوية', grade: 'ثانية ثانوي', subject: 'كيمياء', price: 350 },
      { title: 'مراجعة رياضيات ثالثة ثانوي', description: 'استعد للثانوية العامة', grade: 'ثالثة ثانوي', subject: 'رياضيات', price: 500 },
      { title: 'الفيزياء ثالثة ثانوي', description: 'مراجعة شاملة', grade: 'ثالثة ثانوي', subject: 'فيزياء', price: 480 },
      { title: 'الكيمياء ثالثة ثانوي', description: 'التحضير النهائي', grade: 'ثالثة ثانوي', subject: 'كيمياء', price: 480 },
    ];

    let added = 0;
    for (const course of courses) {
      try {
        await conn.query(
          `INSERT INTO courses (teacher_id, title, description, price, grade, subject) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [teacherId, course.title, course.description, course.price, course.grade, course.subject]
        );
        added++;
      } catch (e: any) {
        if (e.code !== 'ER_DUP_ENTRY') {
          console.log(`⚠️  Failed to add: ${course.title}`);
        }
      }
    }

    console.log(`✅ Added ${added} educational courses!`);
    console.log('📚 Courses range from Grade 1 to Grade 12');
    
    await conn.end();
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

addColumnsAndSeed();
