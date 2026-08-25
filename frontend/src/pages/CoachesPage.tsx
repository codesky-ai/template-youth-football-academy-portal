import React, { useEffect, useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, Award } from 'lucide-react'
import { Coach } from '../types'
import apiService from '../services/apiService'

const CoachesPage: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('')

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const data = await apiService.getCoaches()
        setCoaches(data)
      } catch (error) {
        console.error('خطأ في جلب بيانات المدربين:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCoaches()
  }, [])

  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coach.nationality.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization = !selectedSpecialization || coach.specialization === selectedSpecialization
    return matchesSearch && matchesSpecialization
  })

  const specializations = ['تدريب الناشئين', 'مدرب لياقة بدنية', 'مدرب تكتيك', 'مدرب حراس المرمى']

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
              إدارة المدربين
            </h1>
            <p className="text-gray-600">
              عرض وإدارة جميع مدربي الأكاديميات
            </p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="h-5 w-5 ml-2" />
            إضافة مدرب جديد
          </button>
        </div>
      </div>

      {/* أدوات البحث والفلترة */}
      <div dir="rtl" className="mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* البحث */}
          <div dir="rtl" className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث عن مدرب..."
              className="input-field pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* فلتر التخصص */}
          <div dir="rtl" className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="input-field pr-10 appearance-none"
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
            >
              <option value="">جميع التخصصات</option>
              {specializations.map(specialization => (
                <option key={specialization} value={specialization}>
                  {specialization}
                </option>
              ))}
            </select>
          </div>

          {/* عدد النتائج */}
          <div dir="rtl" className="flex items-center text-sm text-gray-600">
            إجمالي المدربين: <span className="font-medium mr-1">{filteredCoaches.length}</span>
          </div>
        </div>
      </div>

      {/* جدول المدربين */}
      <div dir="rtl" className="card overflow-hidden">
        <div dir="rtl" className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المدرب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العمر
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التخصص
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الخبرة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الشهادة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الراتب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العمليات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCoaches.map((coach) => (
                <tr key={coach.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div dir="rtl" className="flex items-center">
                      <div dir="rtl" className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={coach.avatar}
                          alt={coach.name}
                        />
                      </div>
                      <div dir="rtl" className="mr-4">
                        <div dir="rtl" className="text-sm font-medium text-gray-900">
                          {coach.name}
                        </div>
                        <div dir="rtl" className="text-sm text-gray-500">
                          {coach.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {coach.age} سنة
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {coach.specialization}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div dir="rtl" className="flex items-center">
                      <Award className="h-4 w-4 text-yellow-500 ml-1" />
                      {coach.experience} سنوات
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {coach.certification}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${coach.salary.toLocaleString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div dir="rtl" className="flex space-x-2 space-x-reverse">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCoaches.length === 0 && (
            <div dir="rtl" className="text-center py-12">
              <div dir="rtl" className="text-gray-500 font-arabic">
                لا توجد نتائج مطابقة للبحث
              </div>
            </div>
          )}
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div dir="rtl" className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          إحصائيات المدربين
        </h3>
        <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {specializations.map(specialization => {
            const count = coaches.filter(c => c.specialization === specialization).length
            const percentage = coaches.length > 0 ? Math.round((count / coaches.length) * 100) : 0

            return (
              <div dir="rtl" key={specialization} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <div dir="rtl" className="text-center">
                  <div dir="rtl" className="text-2xl font-bold text-blue-600">{count}</div>
                  <div dir="rtl" className="text-sm text-gray-600 mb-2">{specialization}</div>
                  <div dir="rtl" className="w-full bg-gray-200 rounded-full h-2">
                    <div dir="rtl"
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div dir="rtl" className="text-xs text-gray-500 mt-1">{percentage}%</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* معلومات إضافية */}
        <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div dir="rtl" className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div dir="rtl" className="text-center">
              <div dir="rtl" className="text-2xl font-bold text-green-600">
                {Math.round(coaches.reduce((sum, coach) => sum + coach.experience, 0) / coaches.length) || 0}
              </div>
              <div dir="rtl" className="text-sm text-gray-600">متوسط سنوات الخبرة</div>
            </div>
          </div>

          <div dir="rtl" className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div dir="rtl" className="text-center">
              <div dir="rtl" className="text-2xl font-bold text-yellow-600">
                ${Math.round(coaches.reduce((sum, coach) => sum + coach.salary, 0) / coaches.length).toLocaleString('ar-SA') || 0}
              </div>
              <div dir="rtl" className="text-sm text-gray-600">متوسط الراتب</div>
            </div>
          </div>

          <div dir="rtl" className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div dir="rtl" className="text-center">
              <div dir="rtl" className="text-2xl font-bold text-purple-600">
                {Math.round(coaches.reduce((sum, coach) => sum + coach.age, 0) / coaches.length) || 0}
              </div>
              <div dir="rtl" className="text-sm text-gray-600">متوسط العمر</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoachesPage