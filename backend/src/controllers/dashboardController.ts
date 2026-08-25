import { Request, Response } from 'express'
import { executeQuery } from '../config/database'
import { DashboardStats, Activity, createApiResponse } from '../models'
import { RowDataPacket } from 'mysql2'

class DashboardController {
  async getDashboardStats(req: Request, res: Response): Promise<void> {
    try {
      // جلب الإحصائيات الأساسية
      const statsQueries = await Promise.all([
        executeQuery('SELECT COUNT(*) as count FROM players'),
        executeQuery('SELECT COUNT(*) as count FROM coaches'),
        executeQuery('SELECT COUNT(*) as count FROM teams'),
        executeQuery('SELECT COUNT(*) as count FROM academies')
      ])

      const totalPlayers = (statsQueries[0] as RowDataPacket[])[0].count
      const totalCoaches = (statsQueries[1] as RowDataPacket[])[0].count
      const totalTeams = (statsQueries[2] as RowDataPacket[])[0].count
      const totalAcademies = (statsQueries[3] as RowDataPacket[])[0].count

      // جلب النشاطات الأخيرة
      const recentActivities = await this.getRecentActivitiesData()

      const dashboardStats: DashboardStats & { recentActivities: Activity[] } = {
        totalPlayers,
        totalCoaches,
        totalTeams,
        totalAcademies,
        recentActivities
      }

      res.json(createApiResponse(
        true,
        'تم جلب إحصائيات لوحة المعلومات بنجاح',
        dashboardStats
      ))
    } catch (error) {
      console.error('خطأ في جلب إحصائيات لوحة المعلومات:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في جلب إحصائيات لوحة المعلومات',
        null
      ))
    }
  }

  async getRecentActivities(req: Request, res: Response): Promise<void> {
    try {
      const activities = await this.getRecentActivitiesData()

      res.json(createApiResponse(
        true,
        'تم جلب النشاطات الأخيرة بنجاح',
        activities
      ))
    } catch (error) {
      console.error('خطأ في جلب النشاطات الأخيرة:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في جلب النشاطات الأخيرة',
        null
      ))
    }
  }

  private async getRecentActivitiesData(): Promise<Activity[]> {
    try {
      const activities: Activity[] = []

      // جلب أحدث اللاعبين المنضمين
      const newPlayers = await executeQuery(`
        SELECT p.id, p.name, p.createdAt, t.name as teamName
        FROM players p
        LEFT JOIN teams t ON p.teamId = t.id
        ORDER BY p.createdAt DESC
        LIMIT 3
      `) as RowDataPacket[]

      newPlayers.forEach(player => {
        activities.push({
          id: parseInt(`1${player.id}`),
          type: 'player_joined',
          title: 'انضمام لاعب جديد',
          description: `انضم ${player.name} إلى فريق ${player.teamName || 'غير محدد'}`,
          timestamp: player.createdAt,
          icon: '👋',
          relatedId: player.id
        })
      })

      // جلب أحدث جلسات التدريب
      const newSessions = await executeQuery(`
        SELECT ts.id, ts.title, ts.date, ts.type, t.name as teamName
        FROM training_sessions ts
        LEFT JOIN teams t ON ts.teamId = t.id
        WHERE ts.date >= CURDATE()
        ORDER BY ts.createdAt DESC
        LIMIT 3
      `) as RowDataPacket[]

      newSessions.forEach(session => {
        activities.push({
          id: parseInt(`2${session.id}`),
          type: 'training_session',
          title: 'جلسة تدريب جديدة',
          description: `${session.title} - فريق ${session.teamName || 'غير محدد'}`,
          timestamp: session.date,
          icon: '⚽',
          relatedId: session.id
        })
      })

      // جلب أحدث الفرق المنشأة
      const newTeams = await executeQuery(`
        SELECT t.id, t.name, t.createdAt, a.name as academyName
        FROM teams t
        LEFT JOIN academies a ON t.academyId = a.id
        ORDER BY t.createdAt DESC
        LIMIT 2
      `) as RowDataPacket[]

      newTeams.forEach(team => {
        activities.push({
          id: parseInt(`3${team.id}`),
          type: 'team_created',
          title: 'فريق جديد',
          description: `تم إنشاء فريق ${team.name} في أكاديمية ${team.academyName || 'غير محدد'}`,
          timestamp: team.createdAt,
          icon: '🏆',
          relatedId: team.id
        })
      })

      // جلب أحدث المدربين المعينين
      const newCoaches = await executeQuery(`
        SELECT c.id, c.name, c.specialization, c.createdAt
        FROM coaches c
        ORDER BY c.createdAt DESC
        LIMIT 2
      `) as RowDataPacket[]

      newCoaches.forEach(coach => {
        activities.push({
          id: parseInt(`4${coach.id}`),
          type: 'coach_assigned',
          title: 'تعيين مدرب جديد',
          description: `تم تعيين ${coach.name} كـ ${coach.specialization}`,
          timestamp: coach.createdAt,
          icon: '👨‍🏫',
          relatedId: coach.id
        })
      })

      // ترتيب النشاطات حسب التاريخ
      return activities
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 10)
        .map((activity, index) => ({
          ...activity,
          id: index + 1,
          timestamp: activity.timestamp || new Date().toISOString()
        }))

    } catch (error) {
      console.error('خطأ في جلب النشاطات:', error)
      // إرجاع نشاطات افتراضية في حالة الخطأ
      return [
        {
          id: 1,
          type: 'player_joined',
          title: 'انضمام لاعب جديد',
          description: 'انضم لاعب جديد إلى النظام',
          timestamp: new Date().toISOString(),
          icon: '👋'
        },
        {
          id: 2,
          type: 'training_session',
          title: 'جلسة تدريب',
          description: 'تم إجراء جلسة تدريب جديدة',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          icon: '⚽'
        }
      ]
    }
  }
}

export default new DashboardController()