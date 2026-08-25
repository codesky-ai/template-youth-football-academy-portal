import { Request, Response } from 'express'
import { executeQuery } from '../config/database'
import { Academy, createApiResponse } from '../models'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

class AcademiesController {
  async getAllAcademies(req: Request, res: Response): Promise<void> {
    try {
      const query = `
        SELECT
          a.*,
          (SELECT COUNT(*) FROM players p WHERE p.academyId = a.id) as playersCount,
          (SELECT COUNT(*) FROM coaches c WHERE c.academyId = a.id) as coachesCount,
          (SELECT COUNT(*) FROM teams t WHERE t.academyId = a.id) as teamsCount
        FROM academies a
        ORDER BY a.createdAt DESC
      `

      const academies = await executeQuery(query) as (Academy & RowDataPacket)[]

      res.json(createApiResponse(
        true,
        'تم جلب بيانات الأكاديميات بنجاح',
        academies.map(academy => ({
          id: academy.id.toString(),
          name: academy.name,
          location: academy.location,
          establishedYear: academy.establishedYear,
          logo: academy.logo,
          director: academy.director,
          phone: academy.phone,
          email: academy.email,
          website: academy.website,
          playersCount: academy.playersCount,
          coachesCount: academy.coachesCount,
          teamsCount: academy.teamsCount,
          facilities: academy.facilities ? academy.facilities.split(',') : []
        }))
      ))
    } catch (error) {
      console.error('خطأ في جلب الأكاديميات:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في جلب بيانات الأكاديميات', null))
    }
  }

  async getAcademyById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const query = `
        SELECT
          a.*,
          (SELECT COUNT(*) FROM players p WHERE p.academyId = a.id) as playersCount,
          (SELECT COUNT(*) FROM coaches c WHERE c.academyId = a.id) as coachesCount,
          (SELECT COUNT(*) FROM teams t WHERE t.academyId = a.id) as teamsCount
        FROM academies a
        WHERE a.id = ?
      `

      const academies = await executeQuery(query, [id]) as (Academy & RowDataPacket)[]
      if (academies.length === 0) {
        res.status(404).json(createApiResponse(false, 'الأكاديمية غير موجودة', null))
        return
      }

      const academy = academies[0]
      res.json(createApiResponse(true, 'تم جلب بيانات الأكاديمية بنجاح', {
        id: academy.id.toString(),
        name: academy.name,
        location: academy.location,
        establishedYear: academy.establishedYear,
        logo: academy.logo,
        director: academy.director,
        phone: academy.phone,
        email: academy.email,
        website: academy.website,
        playersCount: academy.playersCount,
        coachesCount: academy.coachesCount,
        teamsCount: academy.teamsCount,
        facilities: academy.facilities ? academy.facilities.split(',') : []
      }))
    } catch (error) {
      console.error('خطأ في جلب الأكاديمية:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في جلب بيانات الأكاديمية', null))
    }
  }

  async createAcademy(req: Request, res: Response): Promise<void> {
    try {
      const { name, location, establishedYear, logo, director, phone, email, website, facilities } = req.body

      const facilitiesStr = Array.isArray(facilities) ? facilities.join(',') : facilities

      const query = `
        INSERT INTO academies (name, location, establishedYear, logo, director, phone, email, website, facilities)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

      const result = await executeQuery(query, [
        name, location, establishedYear, logo, director, phone, email, website, facilitiesStr
      ]) as ResultSetHeader

      const newAcademy = {
        id: result.insertId.toString(),
        name, location, establishedYear, logo, director, phone, email, website,
        playersCount: 0, coachesCount: 0, teamsCount: 0,
        facilities: Array.isArray(facilities) ? facilities : [facilities]
      }

      res.status(201).json(createApiResponse(true, 'تم إنشاء الأكاديمية بنجاح', newAcademy))
    } catch (error) {
      console.error('خطأ في إنشاء الأكاديمية:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في إنشاء الأكاديمية', null))
    }
  }

  async updateAcademy(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const updateFields = { ...req.body }

      if (updateFields.facilities && Array.isArray(updateFields.facilities)) {
        updateFields.facilities = updateFields.facilities.join(',')
      }

      const fields = Object.keys(updateFields).map(key => `${key} = ?`)
      const values = Object.values(updateFields)

      if (fields.length === 0) {
        res.status(400).json(createApiResponse(false, 'لا توجد حقول للتحديث', null))
        return
      }

      const query = `UPDATE academies SET ${fields.join(', ')} WHERE id = ?`
      values.push(id)

      await executeQuery(query, values)
      res.json(createApiResponse(true, 'تم تحديث بيانات الأكاديمية بنجاح', null))
    } catch (error) {
      console.error('خطأ في تحديث الأكاديمية:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في تحديث بيانات الأكاديمية', null))
    }
  }

  async deleteAcademy(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const query = 'DELETE FROM academies WHERE id = ?'
      const result = await executeQuery(query, [id]) as ResultSetHeader

      if (result.affectedRows === 0) {
        res.status(404).json(createApiResponse(false, 'الأكاديمية غير موجودة', null))
        return
      }

      res.json(createApiResponse(true, 'تم حذف الأكاديمية بنجاح', null))
    } catch (error) {
      console.error('خطأ في حذف الأكاديمية:', error)
      res.status(500).json(createApiResponse(false, 'حدث خطأ في حذف الأكاديمية', null))
    }
  }
}

export default new AcademiesController()