import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// إعداد اتصال MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'youth_football_db',
  charset: 'utf8mb4',
  timezone: '+00:00',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
}

// إنشاء مجموعة اتصالات
const pool = mysql.createPool(dbConfig)

// دالة لاختبار الاتصال
export const testConnection = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()
    console.log('✅ تم الاتصال بقاعدة البيانات MySQL بنجاح')
    return true
  } catch (error) {
    console.error('❌ فشل في الاتصال بقاعدة البيانات:', error)
    return false
  }
}

// دالة لتنفيذ استعلامات SQL
export const executeQuery = async (query: string, params?: any[]): Promise<any> => {
  try {
    const [rows] = await pool.execute(query, params)
    return rows
  } catch (error) {
    console.error('خطأ في تنفيذ الاستعلام:', error)
    throw error
  }
}

// دالة للحصول على اتصال من المجموعة
export const getConnection = async () => {
  return await pool.getConnection()
}

// إغلاق مجموعة الاتصالات عند إيقاف التطبيق
export const closePool = async () => {
  try {
    await pool.end()
    console.log('✅ تم إغلاق مجموعة اتصالات قاعدة البيانات')
  } catch (error) {
    console.error('❌ خطأ في إغلاق مجموعة الاتصالات:', error)
  }
}

// تصدير المجموعة الافتراضية
export default pool