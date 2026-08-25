# قاعدة بيانات أكاديميات كرة القدم للشباب

## الوصف
قاعدة بيانات MySQL متكاملة لنظام إدارة أكاديميات كرة القدم للشباب مع دعم كامل للغة العربية ونظام ترميز UTF-8.

## المتطلبات
- MySQL Server 8.0+ أو MariaDB 10.4+
- MySQL Client أو MySQL Workbench
- صلاحيات إنشاء قواعد البيانات والجداول

## هيكل قاعدة البيانات

### الجداول الرئيسية

#### 1. الأكاديميات (academies)
- **الوصف**: معلومات الأكاديميات الرياضية
- **الحقول الرئيسية**:
  - `id` - المعرف الفريد
  - `name` - اسم الأكاديمية
  - `location` - موقع الأكاديمية
  - `establishedYear` - سنة التأسيس
  - `director` - مدير الأكاديمية
  - `facilities` - المرافق المتاحة

#### 2. المدربين (coaches)
- **الوصف**: بيانات المدربين والكادر التدريبي
- **الحقول الرئيسية**:
  - `id` - المعرف الفريد
  - `name` - اسم المدرب
  - `specialization` - التخصص
  - `experience` - سنوات الخبرة
  - `certification` - الشهادات
  - `academyId` - معرف الأكاديمية

#### 3. الفرق (teams)
- **الوصف**: فرق كرة القدم في الأكاديميات
- **الحقول الرئيسية**:
  - `id` - المعرف الفريد
  - `name` - اسم الفريق
  - `ageGroup` - الفئة العمرية
  - `coachId` - معرف المدرب
  - `academyId` - معرف الأكاديمية
  - `league` - الدوري المشارك فيه

#### 4. اللاعبين (players)
- **الوصف**: بيانات اللاعبين الشخصية والرياضية
- **الحقول الرئيسية**:
  - `id` - المعرف الفريد
  - `name` - اسم اللاعب
  - `age` - العمر
  - `position` - المركز في الملعب
  - `teamId` - معرف الفريق
  - `academyId` - معرف الأكاديمية
  - `rating` - التقييم (0-100)

#### 5. جلسات التدريب (training_sessions)
- **الوصف**: جدولة وتفاصيل جلسات التدريب
- **الحقول الرئيسية**:
  - `id` - المعرف الفريد
  - `title` - عنوان الجلسة
  - `teamId` - معرف الفريق
  - `coachId` - معرف المدرب
  - `date` - تاريخ الجلسة
  - `type` - نوع التدريب
  - `attendanceCount` - عدد الحضور

#### 6. الأنشطة (activities)
- **الوصف**: سجل الأنشطة للوحة المعلومات
- **الحقول الرئيسية**:
  - `id` - المعرف الفريد
  - `type` - نوع النشاط
  - `title` - عنوان النشاط
  - `description` - وصف النشاط
  - `relatedId` - معرف العنصر المرتبط

## خطوات الإعداد

### 1. إنشاء قاعدة البيانات والجداول
```bash
# الاتصال بـ MySQL
mysql -u root -p

# تشغيل سكريبت إنشاء قاعدة البيانات
mysql -u root -p < schema.sql
```

### 2. إدراج البيانات التجريبية
```bash
# إدراج البيانات العربية التجريبية
mysql -u root -p youth_football_db < seed.sql
```

### 3. التحقق من نجاح العملية
```bash
# الدخول إلى قاعدة البيانات
mysql -u root -p youth_football_db

# التحقق من الجداول
SHOW TABLES;

# عرض الأكاديميات
SELECT * FROM academies;

# عرض إحصائيات سريعة
SELECT
  (SELECT COUNT(*) FROM academies) as 'عدد الأكاديميات',
  (SELECT COUNT(*) FROM coaches) as 'عدد المدربين',
  (SELECT COUNT(*) FROM teams) as 'عدد الفرق',
  (SELECT COUNT(*) FROM players) as 'عدد اللاعبين';
```

## إعدادات قاعدة البيانات

### ترميز البيانات
- **Charset**: `utf8mb4` (دعم كامل للعربية)
- **Collation**: `utf8mb4_unicode_ci`
- **Engine**: `InnoDB` (دعم المعاملات والعلاقات)

### العلاقات بين الجداول
```
academies (1) ←→ (N) coaches
academies (1) ←→ (N) teams
academies (1) ←→ (N) players
coaches (1) ←→ (N) teams
teams (1) ←→ (N) players
teams (1) ←→ (N) training_sessions
coaches (1) ←→ (N) training_sessions
```

### الفهارس المحسنة للأداء
- فهارس على أسماء الأكاديميات والفرق
- فهارس على مراكز اللاعبين وتخصصات المدربين
- فهارس على تواريخ جلسات التدريب
- فهارس على العلاقات بين الجداول

## البيانات التجريبية المتضمنة

### الأكاديميات (5 أكاديميات)
- أكاديمية الشباب لكرة القدم (القاهرة)
- أكاديمية النجوم الذهبية (دبي)
- أكاديمية الأمل الرياضية (الرياض)
- أكاديمية برشلونة العربية (عمان)
- أكاديمية المحترفين الصغار (طرابلس)

### المدربين (7 مدربين)
- مدربين للناشئين
- مدربين للياقة البدنية
- مدربين تكتيك
- مدربين حراس مرمى

### الفرق (8 فرق)
- فرق مختلفة للفئات العمرية (تحت 14، 16، 18، 20)
- موزعة على الأكاديميات المختلفة

### اللاعبين (10 لاعبين)
- لاعبين من مراكز مختلفة (مهاجم، وسط، مدافع، حارس)
- من جنسيات عربية متنوعة

### جلسات التدريب (8 جلسات)
- أنواع مختلفة من التدريب
- مجدولة لفترات مختلفة

## استعلامات مفيدة

### عرض إحصائيات شاملة
```sql
SELECT 
  a.name as 'الأكاديمية',
  COUNT(DISTINCT c.id) as 'عدد المدربين',
  COUNT(DISTINCT t.id) as 'عدد الفرق',
  COUNT(DISTINCT p.id) as 'عدد اللاعبين'
FROM academies a
LEFT JOIN coaches c ON a.id = c.academyId
LEFT JOIN teams t ON a.id = t.academyId
LEFT JOIN players p ON a.id = p.academyId
GROUP BY a.id, a.name;
```

### البحث عن اللاعبين حسب المركز
```sql
SELECT 
  p.name as 'اسم اللاعب',
  p.position as 'المركز',
  t.name as 'الفريق',
  a.name as 'الأكاديمية'
FROM players p
JOIN teams t ON p.teamId = t.id
JOIN academies a ON p.academyId = a.id
WHERE p.position = 'مهاجم';
```

### جلسات التدريب القادمة
```sql
SELECT 
  ts.title as 'عنوان الجلسة',
  ts.date as 'التاريخ',
  ts.startTime as 'وقت البداية',
  t.name as 'الفريق',
  c.name as 'المدرب'
FROM training_sessions ts
JOIN teams t ON ts.teamId = t.id
JOIN coaches c ON ts.coachId = c.id
WHERE ts.date >= CURDATE()
ORDER BY ts.date, ts.startTime;
```

## صيانة قاعدة البيانات

### النسخ الاحتياطي
```bash
# إنشاء نسخة احتياطية كاملة
mysqldump -u root -p youth_football_db > backup_$(date +%Y%m%d).sql

# إنشاء نسخة احتياطية للبيانات فقط
mysqldump -u root -p --no-create-info youth_football_db > data_backup_$(date +%Y%m%d).sql
```

### الاستعادة من النسخة الاحتياطية
```bash
# استعادة كاملة
mysql -u root -p youth_football_db < backup_20240101.sql

# استعادة البيانات فقط
mysql -u root -p youth_football_db < data_backup_20240101.sql
```

### تحسين الأداء
```sql
-- تحليل الجداول
ANALYZE TABLE academies, coaches, teams, players, training_sessions;

-- تحسين الجداول
OPTIMIZE TABLE academies, coaches, teams, players, training_sessions;

-- إعادة بناء الفهارس
ALTER TABLE players ENGINE=InnoDB;
```

## الأمان والصلاحيات

### إنشاء مستخدم للتطبيق
```sql
-- إنشاء مستخدم جديد
CREATE USER 'football_app'@'localhost' IDENTIFIED BY 'secure_password_here';

-- منح الصلاحيات المطلوبة
GRANT SELECT, INSERT, UPDATE, DELETE ON youth_football_db.* TO 'football_app'@'localhost';

-- تطبيق التغييرات
FLUSH PRIVILEGES;
```

### إعدادات الحماية الموصى بها
```sql
-- تفعيل SSL للاتصالات
-- تحديد صلاحيات محددة لكل مستخدم
-- استخدام كلمات مرور قوية
-- تفعيل سجلات التدقيق
```

## استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### خطأ الترميز
```sql
-- التحقق من الترميز
SHOW CREATE DATABASE youth_football_db;
SHOW CREATE TABLE academies;

-- تصحيح الترميز إذا لزم الأمر
ALTER DATABASE youth_football_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE academies CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### مشاكل الأداء
```sql
-- التحقق من استخدام الفهارس
EXPLAIN SELECT * FROM players WHERE name LIKE '%محمد%';

-- إضافة فهارس جديدة إذا لزم الأمر
CREATE INDEX idx_players_name_search ON players(name(10));
```

#### مشاكل المساحة
```sql
-- التحقق من حجم الجداول
SELECT 
    table_name AS 'الجدول',
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'الحجم (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'youth_football_db';
```

## التطوير المستقبلي

### ميزات مقترحة للإضافة
- جدول النتائج والمباريات
- جدول الإصابات الطبية
- جدول التقييمات والتقارير
- جدول المدفوعات والرسوم
- جدول الحضور والانصراف

### تحسينات مقترحة
- إضافة triggers للتحديث التلقائي
- إنشاء views للاستعلامات المعقدة
- تطبيق stored procedures للعمليات المتكررة
- إضافة نظام الأرشفة للبيانات القديمة

---

🚀 **قاعدة بيانات أكاديميات كرة القدم جاهزة للاستخدام!**