// نماذج البيانات لنظام إدارة أكاديميات كرة القدم

export interface Player {
  id: number
  name: string
  age: number
  position: string
  teamId: number
  academyId: number
  avatar: string
  nationality: string
  height: number
  weight: number
  joinDate: string
  rating: number
  phone: string
  email: string
  createdAt?: string
  updatedAt?: string
}

export interface Coach {
  id: number
  name: string
  age: number
  specialization: string
  experience: number
  academyId: number
  avatar: string
  nationality: string
  certification: string
  phone: string
  email: string
  salary: number
  createdAt?: string
  updatedAt?: string
}

export interface Team {
  id: number
  name: string
  ageGroup: string
  coachId: number
  academyId: number
  logo: string
  playerCount: number
  establishedDate: string
  league: string
  homeStadium: string
  createdAt?: string
  updatedAt?: string
}

export interface Academy {
  id: number
  name: string
  location: string
  establishedYear: number
  logo: string
  director: string
  phone: string
  email: string
  website: string
  playersCount: number
  coachesCount: number
  teamsCount: number
  facilities: string
  createdAt?: string
  updatedAt?: string
}

export interface TrainingSession {
  id: number
  title: string
  teamId: number
  coachId: number
  date: string
  startTime: string
  endTime: string
  location: string
  type: string
  description: string
  attendanceCount: number
  createdAt?: string
  updatedAt?: string
}

export interface Activity {
  id: number
  type: 'player_joined' | 'training_session' | 'team_created' | 'coach_assigned'
  title: string
  description: string
  timestamp: string
  icon: string
  relatedId?: number
  createdAt?: string
}

export interface DashboardStats {
  totalPlayers: number
  totalCoaches: number
  totalTeams: number
  totalAcademies: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  timestamp: string
}

// دالة مساعدة لإنشاء استجابة API
export const createApiResponse = <T>(
  success: boolean,
  message: string,
  data: T
): ApiResponse<T> => {
  return {
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  }
}