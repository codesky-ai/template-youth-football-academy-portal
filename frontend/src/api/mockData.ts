import { Player, Coach, Team, Academy, TrainingSession, DashboardStats, Activity } from '../types'

export const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'محمد أحمد السيد',
    age: 16,
    position: 'مهاجم',
    teamId: '1',
    academyId: '1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    nationality: 'مصري',
    height: 175,
    weight: 65,
    joinDate: '2023-01-15',
    rating: 85,
    phone: '+20123456789',
    email: 'mohamed.ahmed@example.com'
  },
  {
    id: '2',
    name: 'خالد محمود حسن',
    age: 17,
    position: 'وسط',
    teamId: '1',
    academyId: '1',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    nationality: 'سعودي',
    height: 180,
    weight: 70,
    joinDate: '2022-09-10',
    rating: 82,
    phone: '+966123456789',
    email: 'khaled.mahmoud@example.com'
  },
  {
    id: '3',
    name: 'عبدالله يوسف',
    age: 15,
    position: 'مدافع',
    teamId: '2',
    academyId: '1',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    nationality: 'إماراتي',
    height: 178,
    weight: 68,
    joinDate: '2023-03-20',
    rating: 78,
    phone: '+971123456789',
    email: 'abdullah.youssef@example.com'
  }
]

export const mockCoaches: Coach[] = [
  {
    id: '1',
    name: 'أحمد محمد علي',
    age: 35,
    specialization: 'تدريب الناشئين',
    experience: 8,
    academyId: '1',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    nationality: 'مصري',
    certification: 'رخصة UEFA A',
    phone: '+20111111111',
    email: 'ahmed.coach@example.com',
    salary: 15000
  },
  {
    id: '2',
    name: 'محمد عبدالرحمن',
    age: 42,
    specialization: 'مدرب لياقة بدنية',
    experience: 12,
    academyId: '1',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150',
    nationality: 'سعودي',
    certification: 'رخصة FIFA',
    phone: '+966222222222',
    email: 'mohamed.fitness@example.com',
    salary: 12000
  }
]

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'الأبطال الصغار',
    ageGroup: 'تحت ١٦ سنة',
    coachId: '1',
    academyId: '1',
    logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150',
    playerCount: 22,
    establishedDate: '2020-01-01',
    league: 'دوري الناشئين الممتاز',
    homeStadium: 'ملعب الأكاديمية الرئيسي'
  },
  {
    id: '2',
    name: 'نجوم المستقبل',
    ageGroup: 'تحت ١٨ سنة',
    coachId: '2',
    academyId: '1',
    logo: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=150',
    playerCount: 25,
    establishedDate: '2019-08-15',
    league: 'دوري الشباب الأول',
    homeStadium: 'ملعب الأكاديمية الثانوي'
  }
]

export const mockAcademies: Academy[] = [
  {
    id: '1',
    name: 'أكاديمية الشباب لكرة القدم',
    location: 'القاهرة، مصر',
    establishedYear: 2015,
    logo: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=150',
    director: 'الكابتن محمد صلاح',
    phone: '+20100000000',
    email: 'info@youthfootball.com',
    website: 'www.youthfootball.com',
    playersCount: 150,
    coachesCount: 12,
    teamsCount: 8,
    facilities: ['ملاعب عشب طبيعي', 'صالة ألعاب', 'غرف خلع ملابس', 'عيادة طبية', 'كافتيريا']
  },
  {
    id: '2',
    name: 'أكاديمية النجوم الذهبية',
    location: 'دبي، الإمارات',
    establishedYear: 2018,
    logo: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=150',
    director: 'المدرب خالد النعيمي',
    phone: '+971555555555',
    email: 'contact@goldenstars.ae',
    website: 'www.goldenstars.ae',
    playersCount: 200,
    coachesCount: 15,
    teamsCount: 10,
    facilities: ['ملاعب عشب صناعي', 'مسبح أولمبي', 'صالة رياضية', 'مختبر طبي', 'مطعم']
  }
]

export const mockTrainingSessions: TrainingSession[] = [
  {
    id: '1',
    title: 'تدريب تكتيكي - الهجوم المنظم',
    teamId: '1',
    coachId: '1',
    date: '2024-01-15',
    startTime: '16:00',
    endTime: '18:00',
    location: 'الملعب الرئيسي',
    type: 'تدريب تكتيكي',
    description: 'تدريب على التحركات الهجومية والتمرير السريع',
    attendanceCount: 20
  },
  {
    id: '2',
    title: 'لياقة بدنية - تحسين السرعة',
    teamId: '2',
    coachId: '2',
    date: '2024-01-16',
    startTime: '17:00',
    endTime: '19:00',
    location: 'المضمار الرياضي',
    type: 'لياقة بدنية',
    description: 'تمارين لتحسين السرعة والتحمل',
    attendanceCount: 23
  }
]

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'player_joined',
    title: 'انضمام لاعب جديد',
    description: 'انضم محمد أحمد إلى فريق الأبطال الصغار',
    timestamp: '2024-01-10T10:30:00Z',
    icon: '👋'
  },
  {
    id: '2',
    type: 'training_session',
    title: 'جلسة تدريبية',
    description: 'تم إجراء تدريب تكتيكي لفريق نجوم المستقبل',
    timestamp: '2024-01-09T16:00:00Z',
    icon: '⚽'
  },
  {
    id: '3',
    type: 'team_created',
    title: 'فريق جديد',
    description: 'تم إنشاء فريق الأبطال الصاعدون',
    timestamp: '2024-01-08T09:00:00Z',
    icon: '🏆'
  },
  {
    id: '4',
    type: 'coach_assigned',
    title: 'تعيين مدرب',
    description: 'تم تعيين محمد عبدالرحمن كمدرب لياقة بدنية',
    timestamp: '2024-01-07T11:00:00Z',
    icon: '👨‍🏫'
  }
]

export const mockDashboardStats: DashboardStats = {
  totalPlayers: 350,
  totalCoaches: 27,
  totalTeams: 18,
  totalAcademies: 5,
  recentActivities: mockActivities
}

export const mockData = {
  players: mockPlayers,
  coaches: mockCoaches,
  teams: mockTeams,
  academies: mockAcademies,
  trainingSessions: mockTrainingSessions,
  dashboardStats: mockDashboardStats,
  activities: mockActivities
}