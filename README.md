# منصة التعليم العربية 🎓

منصة تعليمية شاملة تربط الطلاب والمعلمين وأولياء الأمور

## 📋 المحتويات

- [نظرة عامة](#نظرة-عامة)
- [المميزات](#المميزات)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [التثبيت والإعداد](#التثبيت-والإعداد)
- [استخدام النظام](#استخدام-النظام)
- [واجهة برمجية API](#واجهة-برمجية-api)

## 🌟 نظرة عامة

منصة تعليم إلكترونية متكاملة تدعم اللغة العربية بشكل كامل، مصممة لتسهيل عملية التعليم والتواصل بين:

- **الطلاب**: الوصول للدورات والتسجيل فيها
- **المعلمون**: إنشاء وإدارة الدورات التعليمية
- **أولياء الأمور**: متابعة تقدم أبنائهم

## ✨ المميزات

### للطلاب

- 📚 تصفح الدورات المتاحة
- ✏️ التسجيل في الدورات
- 📊 عرض الدورات المسجل فيها

### للمعلمين

- ➕ إنشاء دورات تعليمية جديدة
- 📝 تحديد المحتوى والأسعار
- 👥 إدارة الطلاب المسجلين

### للنظام

- 🔐 نظام مصادقة آمن (JWT)
- 👤 إدارة أدوار المستخدمين
- 🌍 دعم كامل للغة العربية (RTL)

## 🛠 التقنيات المستخدمة

### Backend

- **Node.js** + **Express.js**
- **TypeScript**
- **MySQL** (قاعدة البيانات)
- **JWT** (المصادقة)
- **bcrypt** (تشفير كلمات المرور)

### Frontend

- **Next.js 16** (React)
- **TypeScript**
- **Tailwind CSS**
- **Axios** (طلبات API)

## 🚀 التثبيت والإعداد

### المتطلبات

- Node.js 18+
- MySQL 8+
- npm أو yarn

### 1. إعداد قاعدة البيانات

```bash
# تشغيل MySQL وإنشاء قاعدة البيانات
mysql -u root -p
CREATE DATABASE education_platform;
exit;

# استيراد Schema
cd backend
npx ts-node src/scripts/initDb.ts
```

### 2. إعداد Backend

```bash
cd backend

# تثبيت الحزم
npm install

# إعداد ملف .env
echo "PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=education_platform
JWT_SECRET=your_secret_key" > .env

# تشغيل الخادم
npm run dev
```

### 3. إعداد Frontend

```bash
cd frontend

# تثبيت الحزم
npm install

# إعداد ملف .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# تشغيل التطبيق
npm run dev
```

## 💻 استخدام النظام

1. افتح المتصفح على `http://localhost:3000`
2. انقر على "إنشاء حساب جديد"
3. اختر نوع الحساب (طالب / معلم / ولي أمر)
4. املأ البيانات المطلوبة
5. سجل الدخول واستكشف المنصة

### حسابات تجريبية

```
معلم: username: teacher1, password: password123
طالب: username: student1, password: password123
```

## 📡 واجهة برمجية API

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Courses

```http
GET  /api/courses
GET  /api/courses/:id
POST /api/courses (معلم فقط)
```

### Enrollments

```http
POST /api/enrollments
GET  /api/enrollments/my-enrollments
```

## 📁 هيكل المشروع

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/     # منطق العمليات
│   │   ├── routes/          # المسارات
│   │   ├── middleware/      # الوسطاء
│   │   ├── config/          # الإعدادات
│   │   └── types/           # أنواع TypeScript
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── login/           # صفحة تسجيل الدخول
│   │   ├── register/        # صفحة التسجيل
│   │   └── dashboard/       # لوحة التحكم
│   ├── lib/                 # API utilities
│   └── contexts/            # React Context
│
└── schema.sql               # هيكل قاعدة البيانات
```

## 🔒 الأمان

- تشفير كلمات المرور باستخدام bcrypt
- مصادقة JWT للجلسات
- حماية المسارات بناءً على الأدوار
- التحقق من صحة البيانات المدخلة

## 📝 الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام التعليمي.

## 👥 المطورون

تم تطوير هذا المشروع كنظام تعليمي متكامل.

---

**ملاحظة:** هذا المشروع للأغراض التعليمية. للاستخدام في بيئة الإنتاج، يرجى إضافة المزيد من الإجراءات الأمنية.
