import React, { useEffect, useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react'
import { Player } from '../types'
import apiService from '../services/apiService'
import { formatDateArabic } from '../utils/rtl'

const PlayersPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await apiService.getPlayers()
        setPlayers(data)
      } catch (error) {
        console.error('خطأ في جلب بيانات اللاعبين:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.nationality.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = !selectedPosition || player.position === selectedPosition
    return matchesSearch && matchesPosition
  })

  const positions = ['مهاجم', 'وسط', 'مدافع', 'حارس مرمى']

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
              إدارة اللاعبين
            </h1>
            <p className="text-gray-600">
              عرض وإدارة جميع لاعبي الأكاديميات
            </p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="h-5 w-5 ml-2" />
            إضافة لاعب جديد
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
              placeholder="البحث عن لاعب..."
              className="input-field pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* فلتر المركز */}
          <div dir="rtl" className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="input-field pr-10 appearance-none"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option value="">جميع المراكز</option>
              {positions.map(position => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>

          {/* عدد النتائج */}
          <div dir="rtl" className="flex items-center text-sm text-gray-600">
            إجمالي اللاعبين: <span className="font-medium mr-1">{filteredPlayers.length}</span>
          </div>
        </div>
      </div>

      {/* جدول اللاعبين */}
      <div dir="rtl" className="card overflow-hidden">
        <div dir="rtl" className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اللاعب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العمر
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المركز
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الجنسية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التقييم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاريخ الانضمام
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العمليات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div dir="rtl" className="flex items-center">
                      <div dir="rtl" className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={player.avatar}
                          alt={player.name}
                        />
                      </div>
                      <div dir="rtl" className="mr-4">
                        <div dir="rtl" className="text-sm font-medium text-gray-900">
                          {player.name}
                        </div>
                        <div dir="rtl" className="text-sm text-gray-500">
                          {player.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {player.age} سنة
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-football-light text-football-dark">
                      {player.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {player.nationality}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div dir="rtl" className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 ml-2">
                        {player.rating}
                      </span>
                      <div dir="rtl" className="w-16 bg-gray-200 rounded-full h-2">
                        <div dir="rtl"
                          className="bg-football-green h-2 rounded-full"
                          style={{ width: `${player.rating}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateArabic(player.joinDate)}
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

          {filteredPlayers.length === 0 && (
            <div dir="rtl" className="text-center py-12">
              <div dir="rtl" className="text-gray-500 font-arabic">
                لا توجد نتائج مطابقة للبحث
              </div>
            </div>
          )}
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div dir="rtl" className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {positions.map(position => {
          const count = players.filter(p => p.position === position).length
          return (
            <div dir="rtl" key={position} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <div dir="rtl" className="text-center">
                <div dir="rtl" className="text-2xl font-bold text-football-green">{count}</div>
                <div dir="rtl" className="text-sm text-gray-600">{position}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlayersPage