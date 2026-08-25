import React, { useEffect, useState } from 'react'
import { Users, UserCheck, Users as TeamsIcon, Building, TrendingUp, Calendar } from 'lucide-react'
import { DashboardStats, Activity } from '../types'
import apiService from '../services/apiService'
import { formatDateArabic } from '../utils/rtl'

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiService.getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('خطأ في جلب الإحصائيات:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div dir="rtl" className="flex items-center justify-center h-64">
        <div dir="rtl" className="animate-spin rounded-full h-12 w-12 border-b-2 border-football-green"></div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div dir="rtl" className="text-center text-gray-500 font-arabic">
        خطأ في تحميل البيانات
      </div>
    )
  }

  const statCards = [
    {
      title: 'إجمالي اللاعبين',
      value: stats.totalPlayers,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'إجمالي المدربين',
      value: stats.totalCoaches,
      icon: UserCheck,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'إجمالي الفرق',
      value: stats.totalTeams,
      icon: TeamsIcon,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'إجمالي الأكاديميات',
      value: stats.totalAcademies,
      icon: Building,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div dir="rtl" className="font-arabic">
      {/* العنوان الرئيسي */}
      <div dir="rtl" className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          لوحة المعلومات الرئيسية
        </h1>
        <p className="text-gray-600">
          نظرة عامة على أكاديميات كرة القدم للشباب
        </p>
      </div>

      {/* بطاقات الإحصائيات */}
      <div dir="rtl" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((card) => (
          <div dir="rtl" key={card.title} className={`${card.bgColor} overflow-hidden rounded-lg`}>
            <div dir="rtl" className="p-5">
              <div dir="rtl" className="flex items-center">
                <div dir="rtl" className="flex-shrink-0">
                  <div dir="rtl" className={`${card.color} rounded-md p-3`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div dir="rtl" className="mr-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.title}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {card.value.toLocaleString('ar-SA')}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div dir="rtl" className={`${card.color} px-5 py-3`}>
              <div dir="rtl" className="text-sm text-white flex items-center">
                <TrendingUp className="h-4 w-4 ml-1" />
                نشاط متزايد
              </div>
            </div>
          </div>
        ))}
      </div>

      <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* النشاطات الأخيرة */}
        <div dir="rtl" className="card">
          <div dir="rtl" className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              النشاطات الأخيرة
            </h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div dir="rtl" className="space-y-4">
            {stats.recentActivities.map((activity: Activity) => (
              <div dir="rtl" key={activity.id} className="flex items-start space-x-3 space-x-reverse">
                <div dir="rtl" className="flex-shrink-0">
                  <div dir="rtl" className="w-8 h-8 bg-football-light rounded-full flex items-center justify-center">
                    <span className="text-sm">{activity.icon}</span>
                  </div>
                </div>
                <div dir="rtl" className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDateArabic(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* إحصائيات سريعة */}
        <div dir="rtl" className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            إحصائيات سريعة
          </h3>
          <div dir="rtl" className="space-y-4">
            <div dir="rtl" className="flex items-center justify-between">
              <span className="text-sm text-gray-600">معدل اللاعبين لكل فريق</span>
              <span className="text-sm font-medium">
                {Math.round(stats.totalPlayers / stats.totalTeams)} لاعب
              </span>
            </div>
            <div dir="rtl" className="flex items-center justify-between">
              <span className="text-sm text-gray-600">معدل المدربين لكل أكاديمية</span>
              <span className="text-sm font-medium">
                {Math.round(stats.totalCoaches / stats.totalAcademies)} مدرب
              </span>
            </div>
            <div dir="rtl" className="flex items-center justify-between">
              <span className="text-sm text-gray-600">معدل الفرق لكل أكاديمية</span>
              <span className="text-sm font-medium">
                {Math.round(stats.totalTeams / stats.totalAcademies)} فرق
              </span>
            </div>
            <div dir="rtl" className="border-t pt-4">
              <div dir="rtl" className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">إجمالي الأعضاء</span>
                <span className="text-lg font-bold text-football-green">
                  {(stats.totalPlayers + stats.totalCoaches).toLocaleString('ar-SA')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* شريط التقدم */}
      <div dir="rtl" className="mt-8 card">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          نمو الأكاديميات
        </h3>
        <div dir="rtl" className="space-y-4">
          <div dir="rtl">
            <div dir="rtl" className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">نسبة إشغال الفرق</span>
              <span className="text-sm text-gray-500">٨٥%</span>
            </div>
            <div dir="rtl" className="w-full bg-gray-200 rounded-full h-2">
              <div dir="rtl" className="bg-football-green h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div dir="rtl">
            <div dir="rtl" className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">نشاط المدربين</span>
              <span className="text-sm text-gray-500">٩٢%</span>
            </div>
            <div dir="rtl" className="w-full bg-gray-200 rounded-full h-2">
              <div dir="rtl" className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard