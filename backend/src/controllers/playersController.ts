import { Request, Response } from 'express'
import { executeQuery } from '../config/database'
import { Player, createApiResponse } from '../models'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

class PlayersController {
  // جلب جميع اللاعبين
  async getAllPlayers(req: Request, res: Response): Promise<void> {
    try {
      const query = `
        SELECT
          p.*,
          t.name as teamName,
          a.name as academyName
        FROM players p
        LEFT JOIN teams t ON p.teamId = t.id
        LEFT JOIN academies a ON p.academyId = a.id
        ORDER BY p.createdAt DESC
      `

      const players = await executeQuery(query) as (Player & RowDataPacket)[]

      res.json(createApiResponse(
        true,
        'تم جلب بيانات اللاعبين بنجاح',
        players.map(player => ({
          id: player.id.toString(),
          name: player.name,
          age: player.age,
          position: player.position,
          teamId: player.teamId.toString(),
          academyId: player.academyId.toString(),
          avatar: player.avatar,
          nationality: player.nationality,
          height: player.height,
          weight: player.weight,
          joinDate: player.joinDate,
          rating: player.rating,
          phone: player.phone,
          email: player.email
        }))
      ))
    } catch (error) {
      console.error('خطأ في جلب اللاعبين:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في جلب بيانات اللاعبين',
        null
      ))
    }
  }

  // جلب لاعب محدد
  async getPlayerById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const query = `
        SELECT
          p.*,
          t.name as teamName,
          a.name as academyName
        FROM players p
        LEFT JOIN teams t ON p.teamId = t.id
        LEFT JOIN academies a ON p.academyId = a.id
        WHERE p.id = ?
      `

      const players = await executeQuery(query, [id]) as (Player & RowDataPacket)[]

      if (players.length === 0) {
        res.status(404).json(createApiResponse(
          false,
          'اللاعب غير موجود',
          null
        ))
        return
      }

      const player = players[0]
      res.json(createApiResponse(
        true,
        'تم جلب بيانات اللاعب بنجاح',
        {
          id: player.id.toString(),
          name: player.name,
          age: player.age,
          position: player.position,
          teamId: player.teamId.toString(),
          academyId: player.academyId.toString(),
          avatar: player.avatar,
          nationality: player.nationality,
          height: player.height,
          weight: player.weight,
          joinDate: player.joinDate,
          rating: player.rating,
          phone: player.phone,
          email: player.email
        }
      ))
    } catch (error) {
      console.error('خطأ في جلب اللاعب:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في جلب بيانات اللاعب',
        null
      ))
    }
  }

  // إنشاء لاعب جديد
  async createPlayer(req: Request, res: Response): Promise<void> {
    try {
      const {
        name, age, position, teamId, academyId, avatar,
        nationality, height, weight, joinDate, rating, phone, email
      } = req.body

      const query = `
        INSERT INTO players (
          name, age, position, teamId, academyId, avatar,
          nationality, height, weight, joinDate, rating, phone, email
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

      const result = await executeQuery(query, [
        name, age, position, teamId, academyId, avatar,
        nationality, height, weight, joinDate, rating, phone, email
      ]) as ResultSetHeader

      const newPlayer = {
        id: result.insertId.toString(),
        name, age, position, teamId, academyId, avatar,
        nationality, height, weight, joinDate, rating, phone, email
      }

      res.status(201).json(createApiResponse(
        true,
        'تم إنشاء اللاعب بنجاح',
        newPlayer
      ))
    } catch (error) {
      console.error('خطأ في إنشاء اللاعب:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في إنشاء اللاعب',
        null
      ))
    }
  }

  // تحديث بيانات لاعب
  async updatePlayer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const updateFields = req.body

      // إنشاء الاستعلام الديناميكي
      const fields = Object.keys(updateFields).map(key => `${key} = ?`)
      const values = Object.values(updateFields)

      if (fields.length === 0) {
        res.status(400).json(createApiResponse(
          false,
          'لا توجد حقول للتحديث',
          null
        ))
        return
      }

      const query = `UPDATE players SET ${fields.join(', ')} WHERE id = ?`
      values.push(id)

      await executeQuery(query, values)

      // جلب البيانات المحدثة
      const updatedPlayer = await this.getPlayerById(req, res)

    } catch (error) {
      console.error('خطأ في تحديث اللاعب:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في تحديث بيانات اللاعب',
        null
      ))
    }
  }

  // حذف لاعب
  async deletePlayer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const query = 'DELETE FROM players WHERE id = ?'
      const result = await executeQuery(query, [id]) as ResultSetHeader

      if (result.affectedRows === 0) {
        res.status(404).json(createApiResponse(
          false,
          'اللاعب غير موجود',
          null
        ))
        return
      }

      res.json(createApiResponse(
        true,
        'تم حذف اللاعب بنجاح',
        null
      ))
    } catch (error) {
      console.error('خطأ في حذف اللاعب:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في حذف اللاعب',
        null
      ))
    }
  }
}

export default new PlayersController()