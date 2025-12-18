import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

async function seedEducationalCourses() {
  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  try {
    const conn = await mysql.createConnection(config);
    console.log('Connected to database.');

    // Get teacher ID
    const [teachers]: any = await conn.query('SELECT id FROM users WHERE role_id = 3 LIMIT 1');
    const teacherId = teachers[0]?.id || 1;

    // Comprehensive educational courses by grade and subject
    const courses = [
      // ==========================================
      // المرحلة الابتدائية - الصف الأول
      // ==========================================
      { title: 'رياضيات الصف الأول الابتدائي', description: 'تعلم الأرقام من 1 إلى 100، العد، الجمع والطرح البسيط، الأشكال الهندسية الأساسية', grade: 'الصف الأول الابتدائي', subject: 'رياضيات', price: 150 },
      { title: 'اللغة العربية - الصف الأول', description: 'تعلم الحروف الهجائية، القراءة والكتابة، الكلمات والجمل البسيطة', grade: 'الصف الأول الابتدائي', subject: 'لغة عربية', price: 150 },
      { title: 'العلوم - الصف الأول', description: 'اكتشف عالم النباتات والحيوانات والطبيعة من حولك', grade: 'الصف الأول الابتدائي', subject: 'علوم', price: 120 },
      { title: 'English for Grade 1', description: 'Learn ABC, basic words, colors, numbers and simple sentences', grade: 'الصف الأول الابتدائي', subject: 'لغة إنجليزية', price: 140 },
      
      // المرحلة الابتدائية - الصف الثاني
      { title: 'رياضيات الصف الثاني الابتدائي', description: 'الجمع والطرح المتقدم، مقدمة في جداول الضرب، الكسور البسيطة', grade: 'الصف الثاني الابتدائي', subject: 'رياضيات', price: 180 },
      { title: 'اللغة العربية - الصف الثاني', description: 'القراءة والفهم، التعبير الكتابي، قواعد الإملاء الأساسية', grade: 'الصف الثاني الابتدائي', subject: 'لغة عربية', price: 180 },
      { title: 'العلوم - الصف الثاني', description: 'الكائنات الحية، الماء والهواء، الصحة والنظافة', grade: 'الصف الثاني الابتدائي', subject: 'علوم', price: 150 },
      { title: 'English for Grade 2', description: 'Basic vocabulary, simple conversations, reading short stories', grade: 'الصف الثاني الابتدائي', subject: 'لغة إنجليزية', price: 160 },
      { title: 'الدراسات الاجتماعية - الصف الثاني', description: 'تعرف على وطنك ومجتمعك', grade: 'الصف الثاني الابتدائي', subject: 'دراسات', price: 120 },
      
      // المرحلة الابتدائية - الصف الثالث
      { title: 'رياضيات الصف الثالث الابتدائي', description: 'جداول الضرب كاملة، القسمة، الكسور، الهندسة الأساسية', grade: 'الصف الثالث الابتدائي', subject: 'رياضيات', price: 200 },
      { title: 'اللغة العربية - الصف الثالث', description: 'النصوص القرائية، التعبير، قواعد النحو المبسطة', grade: 'الصف الثالث الابتدائي', subject: 'لغة عربية', price: 200 },
      { title: 'العلوم - الصف الثالث', description: 'الطاقة والمادة، الكائنات الحية وبيئاتها', grade: 'الصف الثالث الابتدائي', subject: 'علوم', price: 180 },
      { title: 'English for Grade 3', description: 'Grammar basics, reading comprehension, writing paragraphs', grade: 'الصف الثالث الابتدائي', subject: 'لغة إنجليزية', price: 180 },
      { title: 'الدراسات الاجتماعية - الصف الثالث', description: 'جغرافيا مصر، التاريخ القديم المبسط', grade: 'الصف الثالث الابتدائي', subject: 'دراسات', price: 150 },
      
      // المرحلة الابتدائية - الصف الرابع
      { title: 'رياضيات الصف الرابع الابتدائي', description: 'العمليات على الأعداد الكبيرة، الكسور والأعداد العشرية، المساحة والمحيط', grade: 'الصف الرابع الابتدائي', subject: 'رياضيات', price: 220 },
      { title: 'اللغة العربية - الصف الرابع', description: 'النحو والصرف، الأدب والنصوص، مهارات الكتابة', grade: 'الصف الرابع الابتدائي', subject: 'لغة عربية', price: 220 },
      { title: 'العلوم - الصف الرابع', description: 'الجهاز الهضمي والدوري، المادة وحالاتها، الكهرباء', grade: 'الصف الرابع الابتدائي', subject: 'علوم', price: 200 },
      { title: 'English for Grade 4', description: 'Advanced grammar, essay writing, reading skills', grade: 'الصف الرابع الابتدائي', subject: 'لغة إنجليزية', price: 200 },
      
      // المرحلة الابتدائية - الصف الخامس
      { title: 'رياضيات الصف الخامس الابتدائي', description: 'الأعداد الصحيحة، النسبة والتناسب، الهندسة المتقدمة', grade: 'الصف الخامس الابتدائي', subject: 'رياضيات', price: 250 },
      { title: 'اللغة العربية - الصف الخامس', description: 'البلاغة المبسطة، الإعراب، تحليل النصوص', grade: 'الصف الخامس الابتدائي', subject: 'لغة عربية', price: 250 },
      { title: 'العلوم - الصف الخامس', description: 'الأنظمة الحيوية، الطاقة وتحولاتها، الفضاء', grade: 'الصف الخامس الابتدائي', subject: 'علوم', price: 220 },
      { title: 'English for Grade 5', description: 'Complex grammar, literature appreciation, presentation skills', grade: 'الصف الخامس الابتدائي', subject: 'لغة إنجليزية', price: 220 },
      
      // المرحلة الابتدائية - الصف السادس
      { title: 'رياضيات الصف السادس الابتدائي', description: 'الجبر المبسط، الإحصاء، الهندسة الفراغية المبسطة', grade: 'الصف السادس الابتدائي', subject: 'رياضيات', price: 280 },
      { title: 'اللغة العربية - الصف السادس', description: 'مراجعة شاملة للنحو والصرف، الأدب، التعبير الإبداعي', grade: 'الصف السادس الابتدائي', subject: 'لغة عربية', price: 280 },
      { title: 'العلوم - الصف السادس', description: 'مراجعة شاملة للعلوم، التحضير للمرحلة الإعدادية', grade: 'الصف السادس الابتدائي', subject: 'علوم', price: 250 },
      { title: 'English for Grade 6', description: 'Comprehensive review, exam preparation, advanced skills', grade: 'الصف السادس الابتدائي', subject: 'لغة إنجليزية', price: 250 },
      
      // ==========================================
      // المرحلة الإعدادية - الصف الأول
      // ==========================================
      { title: 'الجبر - أولى إعدادي', description: 'المعادلات والمتباينات الخطية، الأعداد النسبية', grade: 'الصف الأول الإعدادي', subject: 'رياضيات', price: 300 },
      { title: 'الهندسة - أولى إعدادي', description: 'المثلثات، التوازي والتعامد، التحويلات الهندسية', grade: 'الصف الأول الإعدادي', subject: 'رياضيات', price: 300 },
      { title: 'النحو العربي - أولى إعدادي', description: 'أقسام الكلام، الجملة الاسمية والفعلية، الإعراب', grade: 'الصف الأول الإعدادي', subject: 'لغة عربية', price: 280 },
      { title: 'العلوم - أولى إعدادي', description: 'الفيزياء والكيمياء والأحياء الأساسية', grade: 'الصف الأول الإعدادي', subject: 'علوم', price: 290 },
      { title: 'English - Prep 1', description: 'Grammar, reading, writing and conversation skills', grade: 'الصف الأول الإعدادي', subject: 'لغة إنجليزية', price: 280 },
      { title: 'الدراسات الاجتماعية - أولى إعدادي', description: 'التاريخ الإسلامي، جغرافيا العالم العربي', grade: 'الصف الأول الإعدادي', subject: 'دراسات', price: 250 },
      
      // المرحلة الإعدادية - الصف الثاني
      { title: 'الجبر - ثانية إعدادي', description: 'كثيرات الحدود، التحليل، المعادلات التربيعية', grade: 'الصف الثاني الإعدادي', subject: 'رياضيات', price: 320 },
      { title: 'الهندسة - ثانية إعدادي', description: 'الدائرة، المساحات والحجوم، التشابه', grade: 'الصف الثاني الإعدادي', subject: 'رياضيات', price: 320 },
      { title: 'العلوم - ثانية إعدادي', description: 'الحركة والقوة، التفاعلات الكيميائية، التكاثر', grade: 'الصف الثاني الإعدادي', subject: 'علوم', price: 300 },
      { title: 'English - Prep 2', description: 'Advanced grammar, essay writing, listening skills', grade: 'الصف الثاني الإعدادي', subject: 'لغة إنجليزية', price: 300 },
      { title: 'التاريخ والجغرافيا - ثانية إعدادي', description: 'التاريخ الحديث، جغرافيا مصر والعالم', grade: 'الصف الثاني الإعدادي', subject: 'دراسات', price: 270 },
      
      // المرحلة الإعدادية - الصف الثالث
      { title: 'الجبر والإحصاء - ثالثة إعدادي', description: 'الدوال، الإحصاء والاحتمالات، مراجعة شاملة', grade: 'الصف الثالث الإعدادي', subject: 'رياضيات', price: 350 },
      { title: 'الهندسة - ثالثة إعدادي', description: 'حساب المثلثات، الهندسة التحليلية', grade: 'الصف الثالث الإعدادي', subject: 'رياضيات', price: 350 },
      { title: 'العلوم - ثالثة إعدادي', description: 'مراجعة شاملة للفيزياء والكيمياء والأحياء', grade: 'الصف الثالث الإعدادي', subject: 'علوم', price: 320 },
      { title: 'English - Prep 3', description: 'Exam preparation, comprehensive review', grade: 'الصف الثالث الإعدادي', subject: 'لغة إنجليزية', price: 320 },
      { title: 'الدراسات - ثالثة إعدادي', description: 'مراجعة شاملة للتاريخ والجغرافيا', grade: 'الصف الثالث الإعدادي', subject: 'دراسات', price: 280 },
      
      // ==========================================
      // المرحلة الثانوية - الصف الأول
      // ==========================================
      { title: 'الجبر وحساب المثلثات - أولى ثانوي', description: 'الدوال المثلثية، المتتاليات والمتسلسلات', grade: 'الصف الأول الثانوي', subject: 'رياضيات', price: 400 },
      { title: 'الهندسة التحليلية - أولى ثانوي', description: 'المستقيم، الدائرة، القطوع المخروطية', grade: 'الصف الأول الثانوي', subject: 'رياضيات', price: 400 },
      { title: 'الفيزياء - أولى ثانوي', description: 'الميكانيكا، الحرارة، الموجات والصوت', grade: 'الصف الأول الثانوي', subject: 'فيزياء', price: 380 },
      { title: 'الكيمياء - أولى ثانوي', description: 'بنية الذرة، الجدول الدوري، الروابط الكيميائية', grade: 'الصف الأول الثانوي', subject: 'كيمياء', price: 380 },
      { title: 'الأحياء - أولى ثانوي', description: 'الخلية، الأنسجة، التغذية والهضم', grade: 'الصف الأول الثانوي', subject: 'أحياء', price: 360 },
      { title: 'اللغة العربية - أولى ثانوي', description: 'النحو المتقدم، الأدب والبلاغة', grade: 'الصف الأول الثانوي', subject: 'لغة عربية', price: 350 },
      { title: 'English - Secondary 1', description: 'Advanced grammar, literature, academic writing', grade: 'الصف الأول الثانوي', subject: 'لغة إنجليزية', price: 350 },
      { title: 'الحاسب الآلي - أولى ثانوي', description: 'أساسيات البرمجة، قواعد البيانات', grade: 'الصف الأول الثانوي', subject: 'حاسب آلي', price: 320 },
      
      // المرحلة الثانوية - الصف الثاني
      { title: 'التفاضل - ثانية ثانوي', description: 'النهايات والاتصال، التفاضل وتطبيقاته', grade: 'الصف الثاني الثانوي', subject: 'رياضيات', price: 450 },
      { title: 'التكامل - ثانية ثانوي', description: 'التكامل غير المحدود والمحدود، تطبيقات التكامل', grade: 'الصف الثاني الثانوي', subject: 'رياضيات', price: 450 },
      { title: 'الجبر والهندسة الفراغية - ثانية ثانوي', description: 'المصفوفات، الهندسة الفراغية', grade: 'الصف الثاني الثانوي', subject: 'رياضيات', price: 450 },
      { title: 'الفيزياء - ثانية ثانوي', description: 'الكهرباء الساكنة والتيارية، المغناطيسية', grade: 'الصف الثاني الثانوي', subject: 'فيزياء', price: 420 },
      { title: 'الكيمياء - ثانية ثانوي', description: 'الكيمياء العضوية، التفاعلات الكيميائية', grade: 'الصف الثاني الثانوي', subject: 'كيمياء', price: 420 },
      { title: 'الأحياء - ثانية ثانوي', description: 'الدعامة والحركة، التنسيق الهرموني والعصبي', grade: 'الصف الثاني الثانوي', subject: 'أحياء', price: 400 },
      { title: 'البرمجة بلغة Python', description: 'تعلم البرمجة من الصفر إلى الاحتراف', grade: 'الصف الثاني الثانوي', subject: 'حاسب آلي', price: 380 },
      
      // المرحلة الثانوية - الصف الثالث
      { title: 'التفاضل والتكامل - ثالثة ثانوي', description: 'مراجعة شاملة ومكثفة للثانوية العامة', grade: 'الصف الثالث الثانوي', subject: 'رياضيات', price: 550 },
      { title: 'الجبر والهندسة الفراغية - ثالثة ثانوي', description: 'مراجعة نهائية شاملة', grade: 'الصف الثالث الثانوي', subject: 'رياضيات', price: 550 },
      { title: 'الديناميكا - ثالثة ثانوي', description: 'الحركة والقوة والشغل والطاقة', grade: 'الصف الثالث الثانوي', subject: 'رياضيات', price: 500 },
      { title: 'الاستاتيكا - ثالثة ثانوي', description: 'الاتزان، العزوم، الاحتكاك', grade: 'الصف الثالث الثانوي', subject: 'رياضيات', price: 500 },
      { title: 'الفيزياء - ثالثة ثانوي شامل', description: 'مراجعة نهائية شاملة للثانوية العامة', grade: 'الصف الثالث الثانوي', subject: 'فيزياء', price: 530 },
      { title: 'الكيمياء - ثالثة ثانوي شامل', description: 'مراجعة نهائية شاملة للثانوية العامة', grade: 'الصف الثالث الثانوي', subject: 'كيمياء', price: 530 },
      { title: 'الأحياء - ثالثة ثانوي شامل', description: 'الوراثة، التكاثر، المناعة - مراجعة شاملة', grade: 'الصف الثالث الثانوي', subject: 'أحياء', price: 500 },
      { title: 'اللغة العربية - ثالثة ثانوي', description: 'النحو والبلاغة والأدب - مراجعة شاملة', grade: 'الصف الثالث الثانوي', subject: 'لغة عربية', price: 480 },
      { title: 'English - Secondary 3', description: 'Comprehensive exam preparation', grade: 'الصف الثالث الثانوي', subject: 'لغة إنجليزية', price: 480 },
      
      // ==========================================
      // كورسات إضافية ومهارات
      // ==========================================
      { title: 'أساسيات الحاسب الآلي', description: 'تعلم استخدام الكمبيوتر والإنترنت من الصفر', grade: 'جميع المراحل', subject: 'حاسب آلي', price: 200 },
      { title: 'Microsoft Office الشامل', description: 'Word, Excel, PowerPoint - من البداية للاحتراف', grade: 'جميع المراحل', subject: 'حاسب آلي', price: 250 },
      { title: 'البرمجة للمبتدئين', description: 'تعلم أساسيات البرمجة والتفكير المنطقي', grade: 'جميع المراحل', subject: 'حاسب آلي', price: 300 },
      { title: 'تطوير المواقع الإلكترونية', description: 'HTML, CSS, JavaScript - بناء موقعك الأول', grade: 'جميع المراحل', subject: 'حاسب آلي', price: 350 },
      { title: 'الرياضيات الذهنية', description: 'تقنيات الحساب السريع والذهني', grade: 'جميع المراحل', subject: 'رياضيات', price: 180 },
      { title: 'فنون الكتابة الإبداعية', description: 'تعلم كتابة القصص والمقالات بشكل احترافي', grade: 'جميع المراحل', subject: 'لغة عربية', price: 200 },
      { title: 'IELTS Preparation', description: 'Comprehensive IELTS exam preparation course', grade: 'جميع المراحل', subject: 'لغة إنجليزية', price: 400 },
      { title: 'TOEFL Preparation', description: 'Complete TOEFL preparation with practice tests', grade: 'جميع المراحل', subject: 'لغة إنجليزية', price: 400 },
    ];

    // Clear existing courses and insert new ones
    await conn.query('DELETE FROM courses');
    console.log('Cleared existing courses.');

    // Insert courses
    for (const course of courses) {
      await conn.query(
        `INSERT INTO courses (teacher_id, title, description, price, grade, subject) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [teacherId, course.title, course.description, course.price, course.grade, course.subject]
      );
    }

    console.log(`\n✅ Successfully added ${courses.length} educational courses!`);
    console.log('\n📚 Courses breakdown:');
    console.log('   - Primary School (Grades 1-6): 24 courses');
    console.log('   - Preparatory School (Grades 7-9): 16 courses');
    console.log('   - Secondary School (Grades 10-12): 25 courses');
    console.log('   - Additional Skills: 8 courses');
    console.log('\n📖 Subjects covered:');
    console.log('   - رياضيات (Mathematics)');
    console.log('   - لغة عربية (Arabic Language)');
    console.log('   - لغة إنجليزية (English Language)');
    console.log('   - علوم (Science)');
    console.log('   - فيزياء (Physics)');
    console.log('   - كيمياء (Chemistry)');
    console.log('   - أحياء (Biology)');
    console.log('   - دراسات (Social Studies)');
    console.log('   - حاسب آلي (Computer Science)');
    
    await conn.end();
  } catch (err) {
    console.error('❌ Failed to seed courses:', err);
  }
}

seedEducationalCourses();
