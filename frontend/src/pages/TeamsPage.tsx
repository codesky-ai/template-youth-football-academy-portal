import React, { useEffect, useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, Users, Trophy } from 'lucide-react'
import { Team } from '../types'
import apiService from '../services/apiService'
import { formatDateArabic } from '../utils/rtl'

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await apiService.getTeams()
        setTeams(data)
      } catch (error) {
        console.error('خطأ في جلب بيانات الفرق:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.homeStadium.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAgeGroup = !selectedAgeGroup || team.ageGroup === selectedAgeGroup
    return matchesSearch && matchesAgeGroup
  })

  const ageGroups = ['تحت ١٤ سنة', 'تحت ١٦ سنة', 'تحت ١٨ سنة', 'تحت ٢٠ سنة']

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
              إدارة الفرق
            </h1>
            <p className="text-gray-600">
              عرض وإدارة جميع فرق الأكاديميات
            </p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="h-5 w-5 ml-2" />
            إضافة فريق جديد
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
              placeholder="البحث عن فريق..."
              className="input-field pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* فلتر الفئة العمرية */}
          <div dir="rtl" className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="input-field pr-10 appearance-none"
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value)}
            >
              <option value="">جميع الفئات العمرية</option>
              {ageGroups.map(ageGroup => (
                <option key={ageGroup} value={ageGroup}>
                  {ageGroup}
                </option>
              ))}
            </select>
          </div>

          {/* عدد النتائج */}
          <div dir="rtl" className="flex items-center text-sm text-gray-600">
            إجمالي الفرق: <span className="font-medium mr-1">{filteredTeams.length}</span>
          </div>
        </div>
      </div>

      {/* بطاقات الفرق */}
      <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredTeams.map((team) => (
          <div dir="rtl" key={team.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div dir="rtl" className="relative h-48 bg-gradient-to-br from-football-green to-football-dark">
              <img
                src={team.logo}
                alt={team.name}
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div dir="rtl" className="absolute inset-0 flex items-center justify-center">
                <div dir="rtl" className="text-center text-white">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-16 h-16 mx-auto mb-2 rounded-full border-2 border-white shadow-lg"
                  />
                  <h3 className="text-lg font-bold">{team.name}</h3>
                  <p className="text-sm opacity-90">{team.ageGroup}</p>
                </div>
              </div>
            </div>

            <div dir="rtl" className="p-6">
              <div dir="rtl" className="space-y-3">
                <div dir="rtl" className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">الدوري:</span>
                  <span className="text-sm font-medium">{team.league}</span>
                </div>

                <div dir="rtl" className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">الملعب:</span>
                  <span className="text-sm font-medium">{team.homeStadium}</span>
                </div>

                <div dir="rtl" className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Users className="h-4 w-4 ml-1" />
                    عدد اللاعبين:
                  </span>
                  <span className="text-sm font-medium text-football-green">
                    {team.playerCount} لاعب
                  </span>
                </div>

                <div dir="rtl" className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">تاريخ التأسيس:</span>
                  <span className="text-sm font-medium">
                    {formatDateArabic(team.establishedDate)}
                  </span>
                </div>
              </div>

              <div dir="rtl" className="mt-6 pt-4 border-t border-gray-200">
                <div dir="rtl" className="flex justify-between items-center">
                  <div dir="rtl" className="flex space-x-2 space-x-reverse">
                    <button className="text-blue-600 hover:text-blue-900 p-1">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900 p-1">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="flex items-center text-sm text-football-green hover:text-football-dark font-medium">
                    <Trophy className="h-4 w-4 ml-1" />
                    عرض الإنجازات
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div dir="rtl" className="text-center py-12 card">
          <div dir="rtl" className="text-gray-500 font-arabic">
            لا توجد فرق مطابقة للبحث
          </div>
        </div>
      )}

      {/* إحصائيات سريعة */}
      <div dir="rtl" className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          إحصائيات الفرق
        </h3>
        <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ageGroups.map(ageGroup => {
            const count = teams.filter(t => t.ageGroup === ageGroup).length
            const totalPlayers = teams
              .filter(t => t.ageGroup === ageGroup)
              .reduce((sum, team) => sum + team.playerCount, 0)

            return (
              <div dir="rtl" key={ageGroup} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <div dir="rtl" className="text-center">
                  <div dir="rtl" className="text-2xl font-bold text-football-green">{count}</div>
                  <div dir="rtl" className="text-sm text-gray-600 mb-2">{ageGroup}</div>
                  <div dir="rtl" className="text-xs text-gray-500">
                    {totalPlayers} لاعب إجمالي
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* معلومات إضافية */}
        <div dir="rtl" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div dir="rtl" className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div dir="rtl" className="text-center">
              <div dir="rtl" className="text-2xl font-bold text-blue-600">
                {Math.round(teams.reduce((sum, team) => sum + team.playerCount, 0) / teams.length) || 0}
              </div>
              <div dir="rtl" className="text-sm text-gray-600">متوسط اللاعبين لكل فريق</div>
            </div>
          </div>

          <div dir="rtl" className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div dir="rtl" className="text-center">
              <div dir="rtl" className="text-2xl font-bold text-green-600">
                {teams.reduce((sum, team) => sum + team.playerCount, 0)}
              </div>
              <div dir="rtl" className="text-sm text-gray-600">إجمالي اللاعبين</div>
            </div>
          </div>

          <div dir="rtl" className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div dir="rtl" className="text-center">
              <div dir="rtl" className="text-2xl font-bold text-purple-600">
                {new Set(teams.map(team => team.league)).size}
              </div>
              <div dir="rtl" className="text-sm text-gray-600">عدد الدوريات</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamsPage