import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Users,
  UserCheck,
  Users as TeamsIcon,
  Building,
  Calendar,
  X
} from 'lucide-react'
import clsx from 'clsx'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const navigation = [
  { name: 'لوحة المعلومات', href: '/', icon: Home },
  { name: 'اللاعبين', href: '/players', icon: Users },
  { name: 'المدربين', href: '/coaches', icon: UserCheck },
  { name: 'الفرق', href: '/teams', icon: TeamsIcon },
  { name: 'الأكاديميات', href: '/academies', icon: Building },
  { name: 'جدولة التدريب', href: '/schedule', icon: Calendar },
]

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()

  return (
    <>
      {/* خلفية داكنة للهواتف المحمولة */}
      {sidebarOpen && (
        <div dir="rtl"
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* الشريط الجانبي */}
      <div dir="rtl" className={clsx(
        "fixed inset-y-0 right-0 z-30 w-64 bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div dir="rtl" className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 font-arabic">
            أكاديمية كرة القدم
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div dir="rtl" className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={clsx(
                    "sidebar-link",
                    isActive ? "sidebar-link-active" : "sidebar-link-inactive"
                  )}
                >
                  <item.icon className="ml-3 h-5 w-5" />
                  <span className="font-arabic">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* معلومات إضافية في أسفل الشريط الجانبي */}
        <div dir="rtl" className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div dir="rtl" className="text-sm text-gray-500 text-center font-arabic">
            <div dir="rtl">إصدار ١.٠.٠</div>
            <div dir="rtl" className="mt-1">© ٢٠٢٤ أكاديمية الشباب</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar