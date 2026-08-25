# بوابة إدارة أكاديميات كرة القدم للشباب - الخادم الخلفي

## الوصف
خادم API متكامل لنظام إدارة أكاديميات كرة القدم للشباب، مبني باستخدام Node.js و Express و TypeScript مع دعم كامل للغة العربية.

## الميزات الرئيسية
- 🏗️ **بنية RESTful API** متكاملة
- 🗃️ **قاعدة بيانات MySQL** مع دعم UTF-8
- 🔐 **نظام الأمان** مع Helmet و CORS
- 📝 **دعم TypeScript** كامل
- 🌍 **دعم اللغة العربية** في جميع الاستجابات
- 📊 **إحصائيات متقدمة** ولوحة معلومات شاملة
- 🔍 **تتبع النشاطات** في الوقت الفعلي

## المتطلبات
- Node.js 16+ 
- MySQL 8.0+
- npm أو yarn

## التثبيت والإعداد

### 1. تثبيت الحزم
```bash
npm install
```

### 2. إعداد قاعدة البيانات
```bash
# إنشاء قاعدة البيانات (راجع مجلد database/)
mysql -u root -p < ../database/schema.sql
mysql -u root -p youth_football_db < ../database/seed.sql
```

### 3. إعداد متغيرات البيئة
```bash
# نسخ ملف الإعدادات
cp .env.example .env

# تحرير الإعدادات
nano .env
```

### 4. بناء المشروع
```bash
npm run build
```

### 5. تشغيل الخادم
```bash
# للتطوير
npm run dev

# للإنتاج
npm start
```

## نقاط النهاية (API Endpoints)

### اللاعبين (Players)
- `GET /api/players` - جلب جميع اللاعبين
- `GET /api/players/:id` - جلب لاعب محدد
- `POST /api/players` - إنشاء لاعب جديد
- `PUT /api/players/:id` - تحديث بيانات لاعب
- `DELETE /api/players/:id` - حذف لاعب

### المدربين (Coaches)
- `GET /api/coaches` - جلب جميع المدربين
- `GET /api/coaches/:id` - جلب مدرب محدد
- `POST /api/coaches` - إنشاء مدرب جديد
- `PUT /api/coaches/:id` - تحديث بيانات مدرب
- `DELETE /api/coaches/:id` - حذف مدرب

### الفرق (Teams)
- `GET /api/teams` - جلب جميع الفرق
- `GET /api/teams/:id` - جلب فريق محدد
- `POST /api/teams` - إنشاء فريق جديد
- `PUT /api/teams/:id` - تحديث بيانات فريق
- `DELETE /api/teams/:id` - حذف فريق

### الأكاديميات (Academies)
- `GET /api/academies` - جلب جميع الأكاديميات
- `GET /api/academies/:id` - جلب أكاديمية محددة
- `POST /api/academies` - إنشاء أكاديمية جديدة
- `PUT /api/academies/:id` - تحديث بيانات أكاديمية
- `DELETE /api/academies/:id` - حذف أكاديمية

### جلسات التدريب (Training Sessions)
- `GET /api/training-sessions` - جلب جميع جلسات التدريب
- `GET /api/training-sessions/:id` - جلب جلسة محددة
- `POST /api/training-sessions` - إنشاء جلسة جديدة
- `PUT /api/training-sessions/:id` - تحديث جلسة
- `DELETE /api/training-sessions/:id` - حذف جلسة

### لوحة المعلومات (Dashboard)
- `GET /api/dashboard/stats` - جلب الإحصائيات العامة
- `GET /api/dashboard/activities` - جلب النشاطات الأخيرة

## بنية المشروع
```
src/
├── app.ts                 # إعداد Express الرئيسي
├── server.ts             # نقطة بداية الخادم
├── config/
│   └── database.ts       # إعدادات قاعدة البيانات
├── controllers/          # تحكم في منطق العمليات
│   ├── playersController.ts
│   ├── coachesController.ts
│   ├── teamsController.ts
│   ├── academiesController.ts
│   ├── trainingSessionsController.ts
│   └── dashboardController.ts
├── models/               # نماذج البيانات
│   └── index.ts
└── routes/               # مسارات API
    └── index.ts
```

## تشغيل الخادم

### وضع التطوير
```bash
npm run dev
```
الخادم سيعمل على: `http://localhost:3001`

### وضع الإنتاج
```bash
npm run build
npm start
```

## اختبار API
يمكنك اختبار API باستخدام:
- **Postman**: استيراد المجموعة من ملف `api-collection.json`
- **cURL**: أمثلة متوفرة في ملف `api-examples.md`
- **الواجهة الأمامية**: التطبيق سيتصل تلقائياً بالـ API

## إعدادات قاعدة البيانات

### الاتصال
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=youth_football_db
```

### الترميز
- **Charset**: UTF-8 (utf8mb4)
- **Collation**: utf8mb4_unicode_ci
- **Engine**: InnoDB

## الأمان
- **CORS**: مُفعل للواجهة الأمامية
- **Helmet**: حماية Headers
- **Validation**: التحقق من صحة البيانات
- **Error Handling**: معالجة شاملة للأخطاء

## المساهمة
1. Fork المشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add some amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الدعم التقني
للحصول على الدعم التقني، يرجى:
1. مراجعة التوثيق أولاً
2. البحث في Issues الموجودة
3. إنشاء Issue جديد مع التفاصيل الكاملة

## الترخيص
هذا المشروع مرخص تحت رخصة MIT - راجع ملف `LICENSE` للتفاصيل.

---

🚀 **مبروك!** خادم أكاديميات كرة القدم جاهز للعمل!