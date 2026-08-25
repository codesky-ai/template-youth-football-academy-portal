-- بيانات تجريبية عربية لنظام أكاديميات كرة القدم للشباب
-- Arabic Sample Data for Youth Football Academies
-- التشغيل: mysql -u root -p youth_football_db < seed.sql

USE youth_football_db;

-- إدراج الأكاديميات
INSERT INTO academies (name, location, establishedYear, logo, director, phone, email, website, facilities) VALUES
('أكاديمية الشباب لكرة القدم', 'القاهرة، مصر', 2015, 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=150', 'الكابتن محمد صلاح', '+20100000000', 'info@youthfootball.eg', 'www.youthfootball.eg', 'ملاعب عشب طبيعي,صالة ألعاب,غرف خلع ملابس,عيادة طبية,كافتيريا'),

('أكاديمية النجوم الذهبية', 'دبي، الإمارات العربية المتحدة', 2018, 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=150', 'المدرب خالد النعيمي', '+971555555555', 'contact@goldenstars.ae', 'www.goldenstars.ae', 'ملاعب عشب صناعي,مسبح أولمبي,صالة رياضية,مختبر طبي,مطعم'),

('أكاديمية الأمل الرياضية', 'الرياض، المملكة العربية السعودية', 2012, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150', 'الأستاذ أحمد العتيبي', '+966123456789', 'info@amalacademy.sa', 'www.amalacademy.sa', 'ملاعب متعددة,صالة مؤتمرات,مركز طبي,ملعب مغطى,منطقة ترفيهية'),

('أكاديمية برشلونة العربية', 'عمان، الأردن', 2020, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150', 'المدرب سامي الحسن', '+962777777777', 'info@barca-arab.jo', 'www.barca-arab.jo', 'ملاعب تدريب,أكاديمية فنية,مركز إعلامي,صالة لياقة,مقهى'),

('أكاديمية المحترفين الصغار', 'طرابلس، لبنان', 2017, 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150', 'الكابتن نبيل شعيا', '+961222222222', 'contact@youngpros.lb', 'www.youngpros.lb', 'ملعب رئيسي,ملاعب فرعية,غرف دراسية,مكتبة رياضية,عيادة علاج طبيعي');

-- إدراج المدربين
INSERT INTO coaches (name, age, specialization, experience, academyId, avatar, nationality, certification, phone, email, salary) VALUES
('أحمد محمد علي', 35, 'تدريب الناشئين', 8, 1, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150', 'مصري', 'رخصة UEFA A', '+20111111111', 'ahmed.coach@youthfootball.eg', 15000),

('محمد عبدالرحمن', 42, 'مدرب لياقة بدنية', 12, 1, 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150', 'سعودي', 'رخصة FIFA للياقة', '+966222222222', 'mohamed.fitness@youthfootball.eg', 12000),

('خالد النعيمي', 38, 'مدرب تكتيك', 10, 2, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'إماراتي', 'رخصة AFC Pro', '+971333333333', 'khaled@goldenstars.ae', 18000),

('سامي الحسن', 40, 'تدريب الناشئين', 15, 4, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'أردني', 'رخصة UEFA B', '+962444444444', 'sami@barca-arab.jo', 14000),

('نبيل شعيا', 45, 'مدرب حراس المرمى', 18, 5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'لبناني', 'رخصة حراس مرمى FIFA', '+961555555555', 'nabil@youngpros.lb', 13000),

('عبدالله العتيبي', 33, 'مدرب لياقة بدنية', 7, 3, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'سعودي', 'رخصة ACSM', '+966666666666', 'abdullah@amalacademy.sa', 11000),

('يوسف البلوشي', 36, 'تدريب الناشئين', 9, 2, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'إماراتي', 'رخصة AFC A', '+971777777777', 'youssef@goldenstars.ae', 16000);

-- إدراج الفرق
INSERT INTO teams (name, ageGroup, coachId, academyId, logo, establishedDate, league, homeStadium) VALUES
('الأبطال الصغار', 'تحت ١٦ سنة', 1, 1, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150', '2020-01-01', 'دوري الناشئين الممتاز', 'ملعب الأكاديمية الرئيسي'),

('نجوم المستقبل', 'تحت ١٨ سنة', 2, 1, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150', '2019-08-15', 'دوري الشباب الأول', 'ملعب الأكاديمية الثانوي'),

('النجوم الذهبية الصغار', 'تحت ١٤ سنة', 3, 2, 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=150', '2021-03-10', 'دوري براعم دبي', 'الملعب الذهبي'),

('فرسان الأمل', 'تحت ١٦ سنة', 6, 3, 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150', '2020-09-01', 'دوري الناشئين السعودي', 'ملعب الأمل'),

('صقور برشلونة', 'تحت ١٨ سنة', 4, 4, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150', '2021-02-14', 'دوري الشباب الأردني', 'ملعب التميز'),

('أسود لبنان الصغار', 'تحت ١٤ سنة', 5, 5, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150', '2022-01-20', 'دوري البراعم اللبناني', 'ملعب الأرز'),

('الأبطال الذهبيون', 'تحت ٢٠ سنة', 7, 2, 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=150', '2019-05-30', 'دوري الشباب الإماراتي', 'الملعب الأولمبي'),

('نسور الرياض', 'تحت ١٨ سنة', 6, 3, 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150', '2021-10-05', 'دوري الشباب المتقدم', 'ملعب النسور');

-- إدراج اللاعبين
INSERT INTO players (name, age, position, teamId, academyId, avatar, nationality, height, weight, joinDate, rating, phone, email) VALUES
('محمد أحمد السيد', 16, 'مهاجم', 1, 1, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'مصري', 175, 65, '2023-01-15', 85, '+20123456789', 'mohamed.ahmed@example.com'),

('خالد محمود حسن', 17, 'وسط', 2, 1, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'سعودي', 180, 70, '2022-09-10', 82, '+966123456789', 'khaled.mahmoud@example.com'),

('عبدالله يوسف', 15, 'مدافع', 1, 1, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'إماراتي', 178, 68, '2023-03-20', 78, '+971123456789', 'abdullah.youssef@example.com'),

('سعد النعيمي', 13, 'وسط', 3, 2, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'إماراتي', 165, 55, '2023-02-01', 80, '+971987654321', 'saad.alnaimi@example.com'),

('أحمد العتيبي', 15, 'مهاجم', 4, 3, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'سعودي', 170, 60, '2022-11-15', 88, '+966987654321', 'ahmed.alotaibi@example.com'),

('محمد الحسن', 17, 'حارس مرمى', 5, 4, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'أردني', 185, 75, '2022-08-20', 85, '+962123456789', 'mohamed.hassan@example.com'),

('علي شعيا', 13, 'مدافع', 6, 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'لبناني', 160, 50, '2023-01-10', 75, '+961123456789', 'ali.shaia@example.com'),

('زياد البلوشي', 19, 'وسط', 7, 2, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'إماراتي', 182, 72, '2021-05-15', 90, '+971555444333', 'ziad.balushi@example.com'),

('فهد المالكي', 17, 'مهاجم', 8, 3, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'سعودي', 176, 67, '2022-12-01', 86, '+966444333222', 'fahad.malki@example.com'),

('حسام التميمي', 16, 'مدافع', 2, 1, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'مصري', 179, 69, '2023-02-28', 83, '+20444555666', 'hussam.tamimi@example.com');

-- إدراج جلسات التدريب
INSERT INTO training_sessions (title, teamId, coachId, date, startTime, endTime, location, type, description, attendanceCount) VALUES
('تدريب تكتيكي - الهجوم المنظم', 1, 1, '2024-01-15', '16:00:00', '18:00:00', 'الملعب الرئيسي', 'تدريب تكتيكي', 'تدريب على التحركات الهجومية والتمرير السريع', 20),

('لياقة بدنية - تحسين السرعة', 2, 2, '2024-01-16', '17:00:00', '19:00:00', 'المضمار الرياضي', 'لياقة بدنية', 'تمارين لتحسين السرعة والتحمل', 23),

('تدريب مهاري - السيطرة على الكرة', 3, 3, '2024-01-17', '15:30:00', '17:30:00', 'الملعب الذهبي', 'تدريب مهاري', 'تطوير مهارات السيطرة والتحكم بالكرة', 18),

('مباراة ودية - فريق النجوم', 1, 1, '2024-01-20', '14:00:00', '16:00:00', 'ملعب الأكاديمية', 'مباراة ودية', 'مباراة تجريبية ضد فريق آخر', 22),

('تدريب حراس المرمى', 5, 5, '2024-01-18', '16:30:00', '18:00:00', 'منطقة المرمى', 'تدريب متخصص', 'تدريب خاص لحراس المرمى', 3),

('تكتيك دفاعي - خط الدفاع', 4, 6, '2024-01-19', '17:30:00', '19:30:00', 'ملعب الأمل', 'تدريب تكتيكي', 'تنظيم الخط الدفاعي وتحركات المدافعين', 19),

('لياقة عامة للفريق', 6, 5, '2024-01-21', '16:00:00', '17:30:00', 'الصالة الرياضية', 'لياقة بدنية', 'تمارين لياقة شاملة لجميع اللاعبين', 15),

('تدريب هجومي متقدم', 7, 7, '2024-01-22', '18:00:00', '20:00:00', 'الملعب الأولمبي', 'تدريب تكتيكي', 'تطوير الأساليب الهجومية المتقدمة', 25);

-- إدراج الأنشطة
INSERT INTO activities (type, title, description, relatedId, icon) VALUES
('player_joined', 'انضمام لاعب جديد', 'انضم محمد أحمد السيد إلى فريق الأبطال الصغار', 1, '👋'),
('training_session', 'جلسة تدريبية', 'تم إجراء تدريب تكتيكي لفريق الأبطال الصغار', 1, '⚽'),
('team_created', 'فريق جديد', 'تم إنشاء فريق الأبطال الصاعدون', 1, '🏆'),
('coach_assigned', 'تعيين مدرب', 'تم تعيين محمد عبدالرحمن كمدرب لياقة بدنية', 2, '👨‍🏫'),
('player_joined', 'لاعب جديد', 'انضم خالد محمود إلى أكاديمية الشباب', 2, '👋'),
('training_session', 'جلسة تدريب', 'تدريب لياقة بدنية لفريق نجوم المستقبل', 2, '🏃'),
('team_created', 'تأسيس فريق', 'تم تأسيس فريق النجوم الذهبية الصغار', 3, '⭐'),
('coach_assigned', 'مدرب جديد', 'انضم خالد النعيمي كمدرب تكتيك', 3, '👨‍💼');

-- عرض إحصائيات البيانات المدرجة
SELECT 'تم إدراج البيانات التجريبية بنجاح!' as status;
SELECT 'Sample data inserted successfully!' as status_en;

SELECT
  (SELECT COUNT(*) FROM academies) as 'عدد الأكاديميات',
  (SELECT COUNT(*) FROM coaches) as 'عدد المدربين',
  (SELECT COUNT(*) FROM teams) as 'عدد الفرق',
  (SELECT COUNT(*) FROM players) as 'عدد اللاعبين',
  (SELECT COUNT(*) FROM training_sessions) as 'عدد جلسات التدريب',
  (SELECT COUNT(*) FROM activities) as 'عدد الأنشطة';

-- عرض ملخص سريع للبيانات
SELECT 'ملخص الأكاديميات:' as info;
SELECT name as 'اسم الأكاديمية', location as 'الموقع', establishedYear as 'سنة التأسيس' FROM academies;

SELECT 'ملخص الفرق:' as info;
SELECT t.name as 'اسم الفريق', t.ageGroup as 'الفئة العمرية', a.name as 'الأكاديمية'
FROM teams t
JOIN academies a ON t.academyId = a.id;