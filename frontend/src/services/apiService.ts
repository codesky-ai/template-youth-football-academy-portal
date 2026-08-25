import apiClient from '../api/client'
import { mockData } from '../api/mockData'
import { Player, Coach, Team, Academy, TrainingSession, DashboardStats, ApiResponse } from '../types'

const USE_MOCK_DATA = false // يمكن تغييرها لـ true للاختبار

class ApiService {
  // خدمات اللاعبين
  async getPlayers(): Promise<Player[]> {
    if (USE_MOCK_DATA) return mockData.players

    try {
      const response = await apiClient.get<ApiResponse<Player[]>>('/players')
      return response.data.data
    } catch (error) {
      console.warn('فشل في جلب بيانات اللاعبين، استخدام البيانات التجريبية:', error)
      return mockData.players
    }
  }

  async getPlayer(id: string): Promise<Player | null> {
    if (USE_MOCK_DATA) {
      return mockData.players.find(p => p.id === id) || null
    }

    try {
      const response = await apiClient.get<ApiResponse<Player>>(`/players/${id}`)
      return response.data.data
    } catch (error) {
      console.warn('فشل في جلب بيانات اللاعب، استخدام البيانات التجريبية:', error)
      return mockData.players.find(p => p.id === id) || null
    }
  }

  async createPlayer(player: Omit<Player, 'id'>): Promise<Player> {
    if (USE_MOCK_DATA) {
      const newPlayer = { ...player, id: Date.now().toString() }
      mockData.players.push(newPlayer)
      return newPlayer
    }

    try {
      const response = await apiClient.post<ApiResponse<Player>>('/players', player)
      return response.data.data
    } catch (error) {
      console.warn('فشل في إنشاء لاعب جديد:', error)
      throw error
    }
  }

  async updatePlayer(id: string, player: Partial<Player>): Promise<Player> {
    if (USE_MOCK_DATA) {
      const index = mockData.players.findIndex(p => p.id === id)
      if (index !== -1) {
        mockData.players[index] = { ...mockData.players[index], ...player }
        return mockData.players[index]
      }
      throw new Error('اللاعب غير موجود')
    }

    try {
      const response = await apiClient.put<ApiResponse<Player>>(`/players/${id}`, player)
      return response.data.data
    } catch (error) {
      console.warn('فشل في تحديث بيانات اللاعب:', error)
      throw error
    }
  }

  async deletePlayer(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      const index = mockData.players.findIndex(p => p.id === id)
      if (index !== -1) {
        mockData.players.splice(index, 1)
      }
      return
    }

    try {
      await apiClient.delete(`/players/${id}`)
    } catch (error) {
      console.warn('فشل في حذف اللاعب:', error)
      throw error
    }
  }

  // خدمات المدربين
  async getCoaches(): Promise<Coach[]> {
    if (USE_MOCK_DATA) return mockData.coaches

    try {
      const response = await apiClient.get<ApiResponse<Coach[]>>('/coaches')
      return response.data.data
    } catch (error) {
      console.warn('فشل في جلب بيانات المدربين، استخدام البيانات التجريبية:', error)
      return mockData.coaches
    }
  }

  async createCoach(coach: Omit<Coach, 'id'>): Promise<Coach> {
    if (USE_MOCK_DATA) {
      const newCoach = { ...coach, id: Date.now().toString() }
      mockData.coaches.push(newCoach)
      return newCoach
    }

    try {
      const response = await apiClient.post<ApiResponse<Coach>>('/coaches', coach)
      return response.data.data
    } catch (error) {
      console.warn('فشل في إنشاء مدرب جديد:', error)
      throw error
    }
  }

  // خدمات الفرق
  async getTeams(): Promise<Team[]> {
    if (USE_MOCK_DATA) return mockData.teams

    try {
      const response = await apiClient.get<ApiResponse<Team[]>>('/teams')
      return response.data.data
    } catch (error) {
      console.warn('فشل في جلب بيانات الفرق، استخدام البيانات التجريبية:', error)
      return mockData.teams
    }
  }

  async createTeam(team: Omit<Team, 'id'>): Promise<Team> {
    if (USE_MOCK_DATA) {
      const newTeam = { ...team, id: Date.now().toString() }
      mockData.teams.push(newTeam)
      return newTeam
    }

    try {
      const response = await apiClient.post<ApiResponse<Team>>('/teams', team)
      return response.data.data
    } catch (error) {
      console.warn('فشل في إنشاء فريق جديد:', error)
      throw error
    }
  }

  // خدمات الأكاديميات
  async getAcademies(): Promise<Academy[]> {
    if (USE_MOCK_DATA) return mockData.academies

    try {
      const response = await apiClient.get<ApiResponse<Academy[]>>('/academies')
      return response.data.data
    } catch (error) {
      console.warn('فشل في جلب بيانات الأكاديميات، استخدام البيانات التجريبية:', error)
      return mockData.academies
    }
  }

  async createAcademy(academy: Omit<Academy, 'id'>): Promise<Academy> {
    if (USE_MOCK_DATA) {
      const newAcademy = { ...academy, id: Date.now().toString() }
      mockData.academies.push(newAcademy)
      return newAcademy
    }

    try {
      const response = await apiClient.post<ApiResponse<Academy>>('/academies', academy)
      return response.data.data
    } catch (error) {
      console.warn('فشل في إنشاء أكاديمية جديدة:', error)
      throw error
    }
  }

  // خدمات جلسات التدريب
  async getTrainingSessions(): Promise<TrainingSession[]> {
    if (USE_MOCK_DATA) return mockData.trainingSessions

    try {
      const response = await apiClient.get<ApiResponse<TrainingSession[]>>('/training-sessions')
      return response.data.data
    } catch (error) {
      console.warn('فشل في جلب بيانات جلسات التدريب، استخدام البيانات التجريبية:', error)
      return mockData.trainingSessions
    }
  }

  async createTrainingSession(session: Omit<TrainingSession, 'id'>): Promise<TrainingSession> {
    if (USE_MOCK_DATA) {
      const newSession = { ...session, id: Date.now().toString() }
      mockData.trainingSessions.push(newSession)
      return newSession
    }

    try {
      const response = await apiClient.post<ApiResponse<TrainingSession>>('/training-sessions', session)
      return response.data.data
    } catch (error) {
      console.warn('فشل في إنشاء جلسة تدريب جديدة:', error)
      throw error
    }
  }

  // إحصائيات لوحة المعلومات
  async getDashboardStats(): Promise<DashboardStats> {
    if (USE_MOCK_DATA) return mockData.dashboardStats

    try {
      const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats')
      return response.data.data
    } catch (error) {
      console.warn('فشل في جلب إحصائيات لوحة المعلومات، استخدام البيانات التجريبية:', error)
      return mockData.dashboardStats
    }
  }
}

export const apiService = new ApiService()
export default apiService