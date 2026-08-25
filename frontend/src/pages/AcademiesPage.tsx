import React, { useEffect, useState } from 'react'
import { Plus, Search, MapPin, Phone, Mail, Globe, Edit, Trash2, Eye, Building, Users, UserCheck } from 'lucide-react'
import { Academy } from '../types'
import apiService from '../services/apiService'

const AcademiesPage: React.FC = () => {
  const [academies, setAcademies] = useState<Academy[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchAcademies = async () => {
      try {
        const data = await apiService.getAcademies()
        setAcademies(data)
      } catch (error) {
        console.error('خطأ في جلب بيانات الأكاديميات:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAcademies()
  }, [])

  const filteredAcademies = academies.filter(academy =>
    academy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    academy.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    academy.director.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              إدارة الأكاديميات
            </h1>
            <p className="text-gray-600">
              عرض وإدارة جميع أكاديميات كرة القدم
            </p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="h-5 w-5 ml-2" />
            إضافة أكاديمية جديدة
          </button>
        </div>
      </div>

      {/* أداة البحث */}
      <div dir="rtl" className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div dir="rtl" className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في الأكاديميات..."
              className="input-field pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div dir="rtl" className="flex items-center text-sm text-gray-600">
            إجمالي الأكاديميات: <span className="font-medium mr-1">{filteredAcademies.length}</span>
          </div>
        </div>
      </div>

      {/* بطاقات الأكاديميات */}
      <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredAcademies.map((academy) => (
          <div dir="rtl" key={academy.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* رأس البطاقة */}
            <div dir="rtl" className="relative h-32 bg-gradient-to-br from-football-green to-football-dark">
              <div dir="rtl" className="absolute inset-0 flex items-center justify-between p-6">
                <div dir="rtl" className="flex items-center">
                  <img
                    src={academy.logo}
                    alt={academy.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div dir="rtl" className="mr-4 text-white">
                    <h3 className="text-xl font-bold">{academy.name}</h3>
                    <div dir="rtl" className="flex items-center text-sm opacity-90">
                      <MapPin className="h-4 w-4 ml-1" />
                      {academy.location}
                    </div>
                  </div>
                </div>
                <div dir="rtl" className="text-white text-right">
                  <div dir="rtl" className="text-sm opacity-75">تأسست عام</div>
                  <div dir="rtl" className="text-lg font-bold">{academy.establishedYear}</div>
                </div>
              </div>
            </div>

            {/* محتوى البطاقة */}
            <div dir="rtl" className="p-6">
              {/* معلومات الاتصال */}
              <div dir="rtl" className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">معلومات الاتصال</h4>
                <div dir="rtl" className="space-y-2 text-sm text-gray-600">
                  <div dir="rtl" className="flex items-center">
                    <UserCheck className="h-4 w-4 ml-2 text-gray-400" />
                    <span className="font-medium ml-1">المدير:</span>
                    {academy.director}
                  </div>
                  <div dir="rtl" className="flex items-center">
                    <Phone className="h-4 w-4 ml-2 text-gray-400" />
                    <span className="font-medium ml-1">الهاتف:</span>
                    {academy.phone}
                  </div>
                  <div dir="rtl" className="flex items-center">
                    <Mail className="h-4 w-4 ml-2 text-gray-400" />
                    <span className="font-medium ml-1">البريد:</span>
                    {academy.email}
                  </div>
                  <div dir="rtl" className="flex items-center">
                    <Globe className="h-4 w-4 ml-2 text-gray-400" />
                    <span className="font-medium ml-1">الموقع:</span>
                    <a href={`https://${academy.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {academy.website}
                    </a>
                  </div>
                </div>
              </div>

              {/* الإحصائيات */}
              <div dir="rtl" className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">إحصائيات الأكاديمية</h4>
                <div dir="rtl" className="grid grid-cols-3 gap-4">
                  <div dir="rtl" className="text-center p-3 bg-blue-50 rounded-lg">
                    <div dir="rtl" className="text-2xl font-bold text-blue-600">{academy.playersCount}</div>
                    <div dir="rtl" className="text-xs text-gray-600">لاعب</div>
                  </div>
                  <div dir="rtl" className="text-center p-3 bg-green-50 rounded-lg">
                    <div dir="rtl" className="text-2xl font-bold text-green-600">{academy.coachesCount}</div>
                    <div dir="rtl" className="text-xs text-gray-600">مدرب</div>
                  </div>
                  <div dir="rtl" className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div dir="rtl" className="text-2xl font-bold text-yellow-600">{academy.teamsCount}</div>
                    <div dir="rtl" className="text-xs text-gray-600">فريق</div>
                  </div>
                </div>
              </div>

              {/* المرافق */}
              <div dir="rtl" className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">المرافق المتاحة</h4>
                <div dir="rtl" className="flex flex-wrap gap-2">
                  {academy.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      <Building className="h-3 w-3 ml-1" />
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              {/* أزرار العمليات */}
              <div dir="rtl" className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div dir="rtl" className="flex space-x-2 space-x-reverse">
                  <button className="text-blue-600 hover:text-blue-900 p-2">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-900 p-2">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-2">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <button className="btn-secondary text-sm">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAcademies.length === 0 && (
        <div dir="rtl" className="text-center py-12 card">
          <div dir="rtl" className="text-gray-500 font-arabic">
            لا توجد أكاديميات مطابقة للبحث
          </div>
        </div>
      )}

      {/* ملخص الإحصائيات */}
      {academies.length > 0 && (
        <div dir="rtl" className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            ملخص شامل للأكاديميات
          </h3>
          <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div dir="rtl" className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <div dir="rtl" className="text-center">
                <div dir="rtl" className="text-2xl font-bold text-blue-600">
                  {academies.reduce((sum, academy) => sum + academy.playersCount, 0)}
                </div>
                <div dir="rtl" className="text-sm text-gray-600">إجمالي اللاعبين</div>
              </div>
            </div>

            <div dir="rtl" className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <div dir="rtl" className="text-center">
                <div dir="rtl" className="text-2xl font-bold text-green-600">
                  {academies.reduce((sum, academy) => sum + academy.coachesCount, 0)}
                </div>
                <div dir="rtl" className="text-sm text-gray-600">إجمالي المدربين</div>
              </div>
            </div>

            <div dir="rtl" className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <div dir="rtl" className="text-center">
                <div dir="rtl" className="text-2xl font-bold text-yellow-600">
                  {academies.reduce((sum, academy) => sum + academy.teamsCount, 0)}
                </div>
                <div dir="rtl" className="text-sm text-gray-600">إجمالي الفرق</div>
              </div>
            </div>

            <div dir="rtl" className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <div dir="rtl" className="text-center">
                <div dir="rtl" className="text-2xl font-bold text-purple-600">
                  {Math.round(academies.reduce((sum, academy) => sum + (2024 - academy.establishedYear), 0) / academies.length)}
                </div>
                <div dir="rtl" className="text-sm text-gray-600">متوسط سنوات التأسيس</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AcademiesPage