import { Request, Response } from 'express'
import { executeQuery } from '../config/database'
import { TrainingSession, createApiResponse } from '../models'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

class TrainingSessionsController {
  async getAllTrainingSessions(req: Request, res: Response): Promise<void> {
    try {
      const query = `
        SELECT
          ts.*,
          t.name as teamName,
          c.name as coachName
        FROM training_sessions ts
        LEFT JOIN teams t ON ts.teamId = t.id
        LEFT JOIN coaches c ON ts.coachId = c.id
        ORDER BY ts.date DESC, ts.startTime ASC
      `

      const sessions = await executeQuery(query) as (TrainingSession & RowDataPacket)[]

      res.json(createApiResponse(
        true,
        'تم جلب بيانات جلسات التدريب بنجاح',
        sessions.map(session => ({
          id: session.id.toString(),
          title: session.title,
          teamId: session.teamId.toString(),
          coachId: session.coachId.toString(),
          date: session.date,
          startTime: session.startTime,
          endTime: session.endTime,
          location: session.location,
          type: session.type,
          description: session.description,
          attendanceCount: session.attendanceCount
        }))
      ))
    } catch (error) {
      console.error('خطأ في جلب جلسات التدريب:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في جلب بيانات جلسات التدريب', null))
    }
  }

  async getTrainingSessionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const query = `
        SELECT
          ts.*,
          t.name as teamName,
          c.name as coachName
        FROM training_sessions ts
        LEFT JOIN teams t ON ts.teamId = t.id
        LEFT JOIN coaches c ON ts.coachId = c.id
        WHERE ts.id = ?
      `

      const sessions = await executeQuery(query, [id]) as (TrainingSession & RowDataPacket)[]
      if (sessions.length === 0) {
        res.status(404).json(createApiResponse(false, 'جلسة التدريب غير موجودة', null))
        return
      }

      const session = sessions[0]
      res.json(createApiResponse(true, 'تم جلب بيانات جلسة التدريب بنجاح', {
        id: session.id.toString(),
        title: session.title,
        teamId: session.teamId.toString(),
        coachId: session.coachId.toString(),
        date: session.date,
        startTime: session.startTime,
        endTime: session.endTime,
        location: session.location,
        type: session.type,
        description: session.description,
        attendanceCount: session.attendanceCount
      }))
    } catch (error) {
      console.error('خطأ في جلب جلسة التدريب:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في جلب بيانات جلسة التدريب', null))
    }
  }

  async createTrainingSession(req: Request, res: Response): Promise<void> {
    try {
      const { title, teamId, coachId, date, startTime, endTime, location, type, description, attendanceCount } = req.body

      const query = `
        INSERT INTO training_sessions (title, teamId, coachId, date, startTime, endTime, location, type, description, attendanceCount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

      const result = await executeQuery(query, [
        title, teamId, coachId, date, startTime, endTime, location, type, description, attendanceCount || 0
      ]) as ResultSetHeader

      const newSession = {
        id: result.insertId.toString(),
        title, teamId, coachId, date, startTime, endTime, location, type, description,
        attendanceCount: attendanceCount || 0
      }

      res.status(201).json(createApiResponse(true, 'تم إنشاء جلسة التدريب بنجاح', newSession))
    } catch (error) {
      console.error('خطأ في إنشاء جلسة التدريب:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في إنشاء جلسة التدريب', null))
    }
  }

  async updateTrainingSession(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const updateFields = req.body

      const fields = Object.keys(updateFields).map(key => `${key} = ?`)
      const values = Object.values(updateFields)

      if (fields.length === 0) {
        res.status(400).json(createApiResponse(false, 'لا توجد حقول للتحديث', null))
        return
      }

      const query = `UPDATE training_sessions SET ${fields.join(', ')} WHERE id = ?`
      values.push(id)

      await executeQuery(query, values)
      res.json(createApiResponse(true, 'تم تحديث بيانات جلسة التدريب بنجاح', null))
    } catch (error) {
      console.error('خطأ في تحديث جلسة التدريب:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في تحديث بيانات جلسة التدريب', null))
    }
  }

  async deleteTrainingSession(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const query = 'DELETE FROM training_sessions WHERE id = ?'
      const result = await executeQuery(query, [id]) as ResultSetHeader

      if (result.affectedRows === 0) {
        res.status(404).json(createApiResponse(false, 'جلسة التدريب غير موجودة', null))
        return
      }

      res.json(createApiResponse(true, 'تم حذف جلسة التدريب بنجاح', null))
    } catch (error) {
      console.error('خطأ في حذف جلسة التدريب:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في حذف جلسة التدريب', null))
    }
  }
}

export default new TrainingSessionsController()