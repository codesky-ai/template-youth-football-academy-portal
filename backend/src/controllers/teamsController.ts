import { Request, Response } from 'express'
import { executeQuery } from '../config/database'
import { Team, createApiResponse } from '../models'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

class TeamsController {
  async getAllTeams(req: Request, res: Response): Promise<void> {
    try {
      const query = `
        SELECT
          t.*,
          c.name as coachName,
          a.name as academyName,
          (SELECT COUNT(*) FROM players p WHERE p.teamId = t.id) as playerCount
        FROM teams t
        LEFT JOIN coaches c ON t.coachId = c.id
        LEFT JOIN academies a ON t.academyId = a.id
        ORDER BY t.createdAt DESC
      `

      const teams = await executeQuery(query) as (Team & RowDataPacket)[]

      res.json(createApiResponse(
        true,
        'تم جلب بيانات الفرق بنجاح',
        teams.map(team => ({
          id: team.id.toString(),
          name: team.name,
          ageGroup: team.ageGroup,
          coachId: team.coachId.toString(),
          academyId: team.academyId.toString(),
          logo: team.logo,
          playerCount: team.playerCount,
          establishedDate: team.establishedDate,
          league: team.league,
          homeStadium: team.homeStadium
        }))
      ))
    } catch (error) {
      console.error('خطأ في جلب الفرق:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في جلب بيانات الفرق',
        null
      ))
    }
  }

  async getTeamById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const query = `
        SELECT
          t.*,
          c.name as coachName,
          a.name as academyName,
          (SELECT COUNT(*) FROM players p WHERE p.teamId = t.id) as playerCount
        FROM teams t
        LEFT JOIN coaches c ON t.coachId = c.id
        LEFT JOIN academies a ON t.academyId = a.id
        WHERE t.id = ?
      `

      const teams = await executeQuery(query, [id]) as (Team & RowDataPacket)[]

      if (teams.length === 0) {
        res.status(404).json(createApiResponse(false, 'الفريق غير موجود', null))
        return
      }

      const team = teams[0]
      res.json(createApiResponse(
        true,
        'تم جلب بيانات الفريق بنجاح',
        {
          id: team.id.toString(),
          name: team.name,
          ageGroup: team.ageGroup,
          coachId: team.coachId.toString(),
          academyId: team.academyId.toString(),
          logo: team.logo,
          playerCount: team.playerCount,
          establishedDate: team.establishedDate,
          league: team.league,
          homeStadium: team.homeStadium
        }
      ))
    } catch (error) {
      console.error('خطأ في جلب الفريق:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في جلب بيانات الفريق', null))
    }
  }

  async createTeam(req: Request, res: Response): Promise<void> {
    try {
      const { name, ageGroup, coachId, academyId, logo, establishedDate, league, homeStadium } = req.body

      const query = `
        INSERT INTO teams (name, ageGroup, coachId, academyId, logo, establishedDate, league, homeStadium)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `

      const result = await executeQuery(query, [
        name, ageGroup, coachId, academyId, logo, establishedDate, league, homeStadium
      ]) as ResultSetHeader

      const newTeam = {
        id: result.insertId.toString(),
        name, ageGroup, coachId, academyId, logo, playerCount: 0,
        establishedDate, league, homeStadium
      }

      res.status(201).json(createApiResponse(true, 'تم إنشاء الفريق بنجاح', newTeam))
    } catch (error) {
      console.error('خطأ في إنشاء الفريق:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في إنشاء الفريق', null))
    }
  }

  async updateTeam(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const updateFields = req.body

      const fields = Object.keys(updateFields).map(key => `${key} = ?`)
      const values = Object.values(updateFields)

      if (fields.length === 0) {
        res.status(400).json(createApiResponse(false, 'لا توجد حقول للتحديث', null))
        return
      }

      const query = `UPDATE teams SET ${fields.join(', ')} WHERE id = ?`
      values.push(id)

      await executeQuery(query, values)
      res.json(createApiResponse(true, 'تم تحديث بيانات الفريق بنجاح', null))
    } catch (error) {
      console.error('خطأ في تحديث الفريق:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في تحديث بيانات الفريق', null))
    }
  }

  async deleteTeam(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const query = 'DELETE FROM teams WHERE id = ?'
      const result = await executeQuery(query, [id]) as ResultSetHeader

      if (result.affectedRows === 0) {
        res.status(404).json(createApiResponse(false, 'الفريق غير موجود', null))
        return
      }

      res.json(createApiResponse(true, 'تم حذف الفريق بنجاح', null))
    } catch (error) {
      console.error('خطأ في حذف الفريق:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في حذف الفريق', null))
    }
  }
}

export default new TeamsController()