import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'
import { createServer } from 'http'
import app from './app'

// تحميل متغيرات البيئة
dotenv.config()

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || 'localhost'

// إنشاء الخادم
const server = createServer(app)

// بدء تشغيل الخادم
server.listen(PORT, () => {
  console.log(`
🚀 خادم أكاديميات كرة القدم للشباب يعمل الآن!
📱 الرابط المحلي: http://${HOST}:${PORT}
🌐 API Base: http://${HOST}:${PORT}/api
📊 الحالة: تطوير
⚽ نظام إدارة الأكاديميات جاهز للاستخدام!
  `)
})

// معالجة الإغلاق بشكل صحيح
process.on('SIGTERM', () => {
  console.log('📊 إيقاف الخادم بسبب SIGTERM...')
  server.close(() => {
    console.log('✅ تم إيقاف الخادم بنجاح')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('📊 إيقاف الخادم بسبب SIGINT...')
  server.close(() => {
    console.log('✅ تم إيقاف الخادم بنجاح')
    process.exit(0)
  })
})

export default server