-- سكيما قاعدة بيانات أكاديميات كرة القدم للشباب
-- Youth Football Academies Database Schema
-- التشغيل: mysql -u root -p < schema.sql

-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS youth_football_db;
USE youth_football_db;

-- حذف الجداول الموجودة (للتطوير فقط)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS training_sessions;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS coaches;
DROP TABLE IF EXISTS academies;
DROP TABLE IF EXISTS activities;
SET FOREIGN_KEY_CHECKS = 1;

-- جدول الأكاديميات
CREATE TABLE academies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL COMMENT 'اسم الأكاديمية',
  location VARCHAR(500) NOT NULL COMMENT 'موقع الأكاديمية',
  establishedYear INT NOT NULL COMMENT 'سنة التأسيس',
  logo VARCHAR(500) COMMENT 'رابط شعار الأكاديمية',
  director VARCHAR(255) NOT NULL COMMENT 'مدير الأكاديمية',
  phone VARCHAR(20) COMMENT 'رقم الهاتف',
  email VARCHAR(255) COMMENT 'البريد الإلكتروني',
  website VARCHAR(500) COMMENT 'الموقع الإلكتروني',
  facilities TEXT COMMENT 'المرافق المتاحة (مفصولة بفواصل)',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'تاريخ الإنشاء',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'تاريخ آخر تحديث'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='جدول الأكاديميات';

-- جدول المدربين
CREATE TABLE coaches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL COMMENT 'اسم المدرب',
  age INT NOT NULL COMMENT 'العمر',
  specialization VARCHAR(255) NOT NULL COMMENT 'التخصص',
  experience INT NOT NULL COMMENT 'سنوات الخبرة',
  academyId INT NOT NULL COMMENT 'معرف الأكاديمية',
  avatar VARCHAR(500) COMMENT 'رابط صورة المدرب',
  nationality VARCHAR(100) NOT NULL COMMENT 'الجنسية',
  certification VARCHAR(255) COMMENT 'الشهادة',
  phone VARCHAR(20) COMMENT 'رقم الهاتف',
  email VARCHAR(255) COMMENT 'البريد الإلكتروني',
  salary DECIMAL(10, 2) COMMENT 'الراتب',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'تاريخ الإنشاء',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'تاريخ آخر تحديث',
  FOREIGN KEY (academyId) REFERENCES academies(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='جدول المدربين';

-- جدول الفرق
CREATE TABLE teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL COMMENT 'اسم الفريق',
  ageGroup VARCHAR(100) NOT NULL COMMENT 'الفئة العمرية',
  coachId INT COMMENT 'معرف المدرب',
  academyId INT NOT NULL COMMENT 'معرف الأكاديمية',
  logo VARCHAR(500) COMMENT 'رابط شعار الفريق',
  establishedDate DATE COMMENT 'تاريخ التأسيس',
  league VARCHAR(255) COMMENT 'الدوري',
  homeStadium VARCHAR(255) COMMENT 'الملعب المنزلي',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'تاريخ الإنشاء',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'تاريخ آخر تحديث',
  FOREIGN KEY (coachId) REFERENCES coaches(id) ON DELETE SET NULL,
  FOREIGN KEY (academyId) REFERENCES academies(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='جدول الفرق';

-- جدول اللاعبين
CREATE TABLE players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL COMMENT 'اسم اللاعب',
  age INT NOT NULL COMMENT 'العمر',
  position VARCHAR(100) NOT NULL COMMENT 'المركز',
  teamId INT COMMENT 'معرف الفريق',
  academyId INT NOT NULL COMMENT 'معرف الأكاديمية',
  avatar VARCHAR(500) COMMENT 'رابط صورة اللاعب',
  nationality VARCHAR(100) NOT NULL COMMENT 'الجنسية',
  height DECIMAL(5, 2) COMMENT 'الطول (سم)',
  weight DECIMAL(5, 2) COMMENT 'الوزن (كغ)',
  joinDate DATE NOT NULL COMMENT 'تاريخ الانضمام',
  rating INT DEFAULT 50 COMMENT 'التقييم (0-100)',
  phone VARCHAR(20) COMMENT 'رقم الهاتف',
  email VARCHAR(255) COMMENT 'البريد الإلكتروني',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'تاريخ الإنشاء',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'تاريخ آخر تحديث',
  FOREIGN KEY (teamId) REFERENCES teams(id) ON DELETE SET NULL,
  FOREIGN KEY (academyId) REFERENCES academies(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='جدول اللاعبين';

-- جدول جلسات التدريب
CREATE TABLE training_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL COMMENT 'عنوان الجلسة',
  teamId INT NOT NULL COMMENT 'معرف الفريق',
  coachId INT NOT NULL COMMENT 'معرف المدرب',
  date DATE NOT NULL COMMENT 'تاريخ الجلسة',
  startTime TIME NOT NULL COMMENT 'وقت البداية',
  endTime TIME NOT NULL COMMENT 'وقت النهاية',
  location VARCHAR(255) NOT NULL COMMENT 'مكان التدريب',
  type VARCHAR(100) NOT NULL COMMENT 'نوع التدريب',
  description TEXT COMMENT 'وصف الجلسة',
  attendanceCount INT DEFAULT 0 COMMENT 'عدد الحضور',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'تاريخ الإنشاء',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'تاريخ آخر تحديث',
  FOREIGN KEY (teamId) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (coachId) REFERENCES coaches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='جدول جلسات التدريب';

-- جدول الأنشطة (للوحة المعلومات)
CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('player_joined', 'training_session', 'team_created', 'coach_assigned') NOT NULL COMMENT 'نوع النشاط',
  title VARCHAR(255) NOT NULL COMMENT 'عنوان النشاط',
  description TEXT COMMENT 'وصف النشاط',
  relatedId INT COMMENT 'معرف العنصر المرتبط',
  icon VARCHAR(10) DEFAULT '📋' COMMENT 'أيقونة النشاط',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'تاريخ الإنشاء'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='جدول الأنشطة';

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX idx_players_team ON players(teamId);
CREATE INDEX idx_players_academy ON players(academyId);
CREATE INDEX idx_players_position ON players(position);
CREATE INDEX idx_players_name ON players(name);

CREATE INDEX idx_coaches_academy ON coaches(academyId);
CREATE INDEX idx_coaches_specialization ON coaches(specialization);
CREATE INDEX idx_coaches_name ON coaches(name);

CREATE INDEX idx_teams_academy ON teams(academyId);
CREATE INDEX idx_teams_coach ON teams(coachId);
CREATE INDEX idx_teams_agegroup ON teams(ageGroup);

CREATE INDEX idx_academies_name ON academies(name);
CREATE INDEX idx_academies_location ON academies(location);

CREATE INDEX idx_training_sessions_team ON training_sessions(teamId);
CREATE INDEX idx_training_sessions_coach ON training_sessions(coachId);
CREATE INDEX idx_training_sessions_date ON training_sessions(date);
CREATE INDEX idx_training_sessions_type ON training_sessions(type);

CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_created ON activities(createdAt);

-- عرض حالة إنشاء قاعدة البيانات
SELECT 'تم إنشاء قاعدة البيانات بنجاح!' as status;
SELECT 'Database schema created successfully!' as status_en;

-- عرض الجداول المنشأة
SHOW TABLES;