import { Request, Response } from 'express'
import { executeQuery } from '../config/database'
import { Coach, createApiResponse } from '../models'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

class CoachesController {
  // جلب جميع المدربين
  async getAllCoaches(req: Request, res: Response): Promise<void> {
    try {
      const query = `
        SELECT
          c.*,
          a.name as academyName
        FROM coaches c
        LEFT JOIN academies a ON c.academyId = a.id
        ORDER BY c.createdAt DESC
      `

      const coaches = await executeQuery(query) as (Coach & RowDataPacket)[]

      res.json(createApiResponse(
        true,
        'تم جلب بيانات المدربين بنجاح',
        coaches.map(coach => ({
          id: coach.id.toString(),
          name: coach.name,
          age: coach.age,
          specialization: coach.specialization,
          experience: coach.experience,
          academyId: coach.academyId.toString(),
          avatar: coach.avatar,
          nationality: coach.nationality,
          certification: coach.certification,
          phone: coach.phone,
          email: coach.email,
          salary: coach.salary
        }))
      ))
    } catch (error) {
      console.error('خطأ في جلب المدربين:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في جلب بيانات المدربين',
        null
      ))
    }
  }

  // جلب مدرب محدد
  async getCoachById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const query = `
        SELECT
          c.*,
          a.name as academyName
        FROM coaches c
        LEFT JOIN academies a ON c.academyId = a.id
        WHERE c.id = ?
      `

      const coaches = await executeQuery(query, [id]) as (Coach & RowDataPacket)[]

      if (coaches.length === 0) {
        res.status(404).json(createApiResponse(
          false,
          'المدرب غير موجود',
          null
        ))
        return
      }

      const coach = coaches[0]
      res.json(createApiResponse(
        true,
        'تم جلب بيانات المدرب بنجاح',
        {
          id: coach.id.toString(),
          name: coach.name,
          age: coach.age,
          specialization: coach.specialization,
          experience: coach.experience,
          academyId: coach.academyId.toString(),
          avatar: coach.avatar,
          nationality: coach.nationality,
          certification: coach.certification,
          phone: coach.phone,
          email: coach.email,
          salary: coach.salary
        }
      ))
    } catch (error) {
      console.error('خطأ في جلب المدرب:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في جلب بيانات المدرب',
        null
      ))
    }
  }

  // إنشاء مدرب جديد
  async createCoach(req: Request, res: Response): Promise<void> {
    try {
      const {
        name, age, specialization, experience, academyId, avatar,
        nationality, certification, phone, email, salary
      } = req.body

      const query = `
        INSERT INTO coaches (
          name, age, specialization, experience, academyId, avatar,
          nationality, certification, phone, email, salary
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

      const result = await executeQuery(query, [
        name, age, specialization, experience, academyId, avatar,
        nationality, certification, phone, email, salary
      ]) as ResultSetHeader

      const newCoach = {
        id: result.insertId.toString(),
        name, age, specialization, experience, academyId, avatar,
        nationality, certification, phone, email, salary
      }

      res.status(201).json(createApiResponse(
        true,
        'تم إنشاء المدرب بنجاح',
        newCoach
      ))
    } catch (error) {
      console.error('خطأ في إنشاء المدرب:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في إنشاء المدرب',
        null
      ))
    }
  }

  // تحديث بيانات مدرب
  async updateCoach(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const updateFields = req.body

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

      const query = `UPDATE coaches SET ${fields.join(', ')} WHERE id = ?`
      values.push(id)

      await executeQuery(query, values)

      res.json(createApiResponse(
        true,
        'تم تحديث بيانات المدرب بنجاح',
        null
      ))
    } catch (error) {
      console.error('خطأ في تحديث المدرب:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في تحديث بيانات المدرب',
        null
      ))
    }
  }

  // حذف مدرب
  async deleteCoach(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const query = 'DELETE FROM coaches WHERE id = ?'
      const result = await executeQuery(query, [id]) as ResultSetHeader

      if (result.affectedRows === 0) {
        res.status(404).json(createApiResponse(
          false,
          'المدرب غير موجود',
          null
        ))
        return
      }

      res.json(createApiResponse(
        true,
        'تم حذف المدرب بنجاح',
        null
      ))
    } catch (error) {
      console.error('خطأ في حذف المدرب:', error)
      res.status(500).json(createApiResponse(
        false,
        'حدث خطأ في حذف المدرب',
        null
      ))
    }
  }
}

export default new CoachesController()