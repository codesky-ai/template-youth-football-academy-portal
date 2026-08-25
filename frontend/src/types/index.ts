export interface Player {
  id: string
  name: string
  age: number
  position: string
  teamId: string
  academyId: string
  avatar: string
  nationality: string
  height: number
  weight: number
  joinDate: string
  rating: number
  phone: string
  email: string
}

export interface Coach {
  id: string
  name: string
  age: number
  specialization: string
  experience: number
  academyId: string
  avatar: string
  nationality: string
  certification: string
  phone: string
  email: string
  salary: number
}

export interface Team {
  id: string
  name: string
  ageGroup: string
  coachId: string
  academyId: string
  logo: string
  playerCount: number
  establishedDate: string
  league: string
  homeStadium: string
}

export interface Academy {
  id: string
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
  facilities: string[]
}

export interface TrainingSession {
  id: string
  title: string
  teamId: string
  coachId: string
  date: string
  startTime: string
  endTime: string
  location: string
  type: string
  description: string
  attendanceCount?: number
}

export interface DashboardStats {
  totalPlayers: number
  totalCoaches: number
  totalTeams: number
  totalAcademies: number
  recentActivities: Activity[]
}

export interface Activity {
  id: string
  type: 'player_joined' | 'training_session' | 'team_created' | 'coach_assigned'
  title: string
  description: string
  timestamp: string
  icon: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}