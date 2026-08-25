import React, { useEffect, useState } from 'react'
import { Plus, Calendar, Clock, MapPin, Users as UsersIcon, Filter, Search } from 'lucide-react'
import { TrainingSession } from '../types'
import apiService from '../services/apiService'
import { formatDateArabic, formatTimeArabic } from '../utils/rtl'

const TrainingSchedulePage: React.FC = () => {
  const [sessions, setSessions] = useState<TrainingSession[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await apiService.getTrainingSessions()
        setSessions(data)
      } catch (error) {
        console.error('خطأ في جلب بيانات جلسات التدريب:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [])

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || session.type === selectedType
    const matchesDate = !selectedDate || session.date === selectedDate
    return matchesSearch && matchesType && matchesDate
  })

  const sessionTypes = ['تدريب تكتيكي', 'لياقة بدنية', 'تدريب مهاري', 'مباراة ودية']

  // تجميع الجلسات حسب التاريخ
  const sessionsByDate = filteredSessions.reduce((acc, session) => {
    const date = session.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(session)
    return acc
  }, {} as Record<string, TrainingSession[]>)

  // ترتيب التواريخ
  const sortedDates = Object.keys(sessionsByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

  if (loading) {
    return (
      <div dir="rtl" className="flex items-center justify-center h-64">
        <div dir="rtl" className="animate-spin rounded-full h-12 w-12 border-b-2 border-football-green"></div>
      </div>
    )
  }

  return (
    <div dir="rtl" className="font-arabic">
      {/* رأس الصفحة */}
      <div dir="rtl" className="mb-8">
        <div dir="rtl" className="flex justify-between items-center">
          <div dir="rtl">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              جدولة التدريب
            </h1>
            <p className="text-gray-600">
              عرض وإدارة جلسات التدريب لجميع الفرق
            </p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="h-5 w-5 ml-2" />
            إضافة جلسة تدريب
          </button>
        </div>
      </div>

      {/* أدوات البحث والفلترة */}
      <div dir="rtl" className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div dir="rtl" className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* البحث */}
          <div dir="rtl" className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في الجلسات..."
              className="input-field pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* فلتر نوع التدريب */}
          <div dir="rtl" className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="input-field pr-10 appearance-none"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">جميع الأنواع</option>
              {sessionTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* فلتر التاريخ */}
          <div dir="rtl" className="relative">
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              className="input-field pr-10"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {/* عدد النتائج */}
          <div dir="rtl" className="flex items-center text-sm text-gray-600">
            إجمالي الجلسات: <span className="font-medium mr-1">{filteredSessions.length}</span>
          </div>
        </div>
      </div>

      {/* عرض الجلسات مجمعة حسب التاريخ */}
      <div dir="rtl" className="space-y-6">
        {sortedDates.map(date => (
          <div dir="rtl" key={date} className="card">
            {/* عنوان التاريخ */}
            <div dir="rtl" className="flex items-center mb-4 pb-2 border-b border-gray-200">
              <Calendar className="h-5 w-5 text-football-green ml-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                {formatDateArabic(date)}
              </h3>
              <span className="mr-auto text-sm text-gray-500">
                {sessionsByDate[date].length} جلسة تدريب
              </span>
            </div>

            {/* جلسات التدريب لهذا اليوم */}
            <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessionsByDate[date].map(session => (
                <div dir="rtl" key={session.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  {/* رأس البطاقة */}
                  <div dir="rtl" className="flex items-start justify-between mb-3">
                    <div dir="rtl" className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {session.title}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                        session.type === 'تدريب تكتيكي' ? 'bg-blue-100 text-blue-800' :
                        session.type === 'لياقة بدنية' ? 'bg-green-100 text-green-800' :
                        session.type === 'تدريب مهاري' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {session.type}
                      </span>
                    </div>
                  </div>

                  {/* التفاصيل */}
                  <div dir="rtl" className="space-y-2 text-sm text-gray-600">
                    <div dir="rtl" className="flex items-center">
                      <Clock className="h-4 w-4 ml-1 text-gray-400" />
                      <span>
                        {formatTimeArabic(session.startTime)} - {formatTimeArabic(session.endTime)}
                      </span>
                    </div>

                    <div dir="rtl" className="flex items-center">
                      <MapPin className="h-4 w-4 ml-1 text-gray-400" />
                      <span>{session.location}</span>
                    </div>

                    {session.attendanceCount && (
                      <div dir="rtl" className="flex items-center">
                        <UsersIcon className="h-4 w-4 ml-1 text-gray-400" />
                        <span>{session.attendanceCount} مشارك</span>
                      </div>
                    )}
                  </div>

                  {/* الوصف */}
                  {session.description && (
                    <p className="text-xs text-gray-500 mt-3 line-clamp-2">
                      {session.description}
                    </p>
                  )}

                  {/* أزرار العمليات */}
                  <div dir="rtl" className="flex justify-between items-center mt-4 pt-3 border-t border-gray-300">
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      عرض التفاصيل
                    </button>
                    <div dir="rtl" className="flex space-x-1 space-x-reverse">
                      <button className="text-xs text-yellow-600 hover:text-yellow-800">
                        تعديل
                      </button>
                      <button className="text-xs text-red-600 hover:text-red-800">
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {sortedDates.length === 0 && (
          <div dir="rtl" className="text-center py-12 card">
            <div dir="rtl" className="text-gray-500 font-arabic">
              لا توجد جلسات تدريب مطابقة للمعايير المحددة
            </div>
          </div>
        )}
      </div>

      {/* إحصائيات سريعة */}
      {sessions.length > 0 && (
        <div dir="rtl" className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            إحصائيات التدريب
          </h3>
          <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sessionTypes.map(type => {
              const count = sessions.filter(s => s.type === type).length
              const totalAttendance = sessions
                .filter(s => s.type === type && s.attendanceCount)
                .reduce((sum, session) => sum + (session.attendanceCount || 0), 0)

              return (
                <div dir="rtl" key={type} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                  <div dir="rtl" className="text-center">
                    <div dir="rtl" className="text-2xl font-bold text-football-green">{count}</div>
                    <div dir="rtl" className="text-sm text-gray-600 mb-1">{type}</div>
                    {totalAttendance > 0 && (
                      <div dir="rtl" className="text-xs text-gray-500">
                        {totalAttendance} مشارك إجمالي
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* مؤشر النشاط الأسبوعي */}
          <div dir="rtl" className="mt-6 card">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              نشاط التدريب الأسبوعي
            </h4>
            <div dir="rtl" className="space-y-3">
              {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((day, index) => {
                // حساب عدد الجلسات لكل يوم (مثال تقريبي)
                const dayCount = Math.floor(Math.random() * 5) + 1
                const maxSessions = 8
                const percentage = (dayCount / maxSessions) * 100

                return (
                  <div dir="rtl" key={day} className="flex items-center">
                    <span className="w-20 text-sm text-gray-600">{day}</span>
                    <div dir="rtl" className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                      <div dir="rtl"
                        className="bg-football-green h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-16">{dayCount} جلسات</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrainingSchedulePage