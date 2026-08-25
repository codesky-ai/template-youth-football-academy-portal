import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'
import routes from './routes'

// تحميل متغيرات البيئة
dotenv.config()

const app: Express = express()

// إعدادات الأمان
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// ضغط الاستجابات
app.use(compression())

// إعدادات CORS للسماح للواجهة الأمامية بالوصول
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
  credentials: true
}))

// تحليل JSON مع دعم UTF-8
app.use(express.json({
  limit: '10mb',
  type: ['application/json', 'application/*+json']
}))

// تحليل URL encoded
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}))

// إضافة معلومات الطلب للتسجيل
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// الصفحة الرئيسية للـ API
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'مرحباً بكم في API أكاديميات كرة القدم للشباب',
    version: '1.0.0',
    endpoints: {
      players: '/api/players',
      coaches: '/api/coaches',
      teams: '/api/teams',
      academies: '/api/academies',
      trainingSessions: '/api/training-sessions',
      dashboard: '/api/dashboard'
    },
    status: 'يعمل بنجاح',
    timestamp: new Date().toISOString()
  })
})

// تحقق من حالة الخادم
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'الخادم يعمل بشكل طبيعي',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  })
})

// استخدام المسارات الرئيسية
app.use('/api', routes)

// معالجة المسارات غير الموجودة
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'المسار المطلوب غير موجود',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  })
})

// معالجة الأخطاء العامة
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('خطأ في الخادم:', error)

  res.status(500).json({
    success: false,
    message: 'خطأ داخلي في الخادم',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error',
    timestamp: new Date().toISOString()
  })
})

export default app