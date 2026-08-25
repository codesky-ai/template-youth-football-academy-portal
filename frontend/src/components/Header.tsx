import React from 'react'
import { Menu, Bell, Search, User } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div dir="rtl" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div dir="rtl" className="flex justify-between items-center h-16">
          {/* زر القائمة للهواتف المحمولة */}
          <div dir="rtl" className="flex items-center lg:hidden">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-football-green"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* العنوان */}
          <div dir="rtl" className="flex-1 lg:flex-none">
            <h2 className="text-lg font-semibold text-gray-900 font-arabic lg:hidden">
              بوابة إدارة الأكاديميات
            </h2>
          </div>

          {/* شريط البحث - مخفي في الهواتف المحمولة */}
          <div dir="rtl" className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div dir="rtl" className="w-full relative">
              <div dir="rtl" className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-football-green focus:border-football-green text-right font-arabic"
                placeholder="البحث في النظام..."
              />
            </div>
          </div>

          {/* أزرار الإشعارات والمستخدم */}
          <div dir="rtl" className="flex items-center space-x-4 space-x-reverse">
            {/* زر البحث للهواتف المحمولة */}
            <button className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600">
              <Search className="h-6 w-6" />
            </button>

            {/* الإشعارات */}
            <button className="relative p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-football-green">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 left-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {/* قائمة المستخدم */}
            <div dir="rtl" className="relative">
              <button className="flex items-center p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-football-green">
                <User className="h-6 w-6" />
                <span className="hidden md:block mr-2 text-sm font-medium text-gray-700 font-arabic">
                  أحمد محمد
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* شريط بحث للهواتف المحمولة */}
      <div dir="rtl" className="lg:hidden border-t border-gray-200 px-4 py-3">
        <div dir="rtl" className="relative">
          <div dir="rtl" className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-football-green focus:border-football-green text-right font-arabic"
            placeholder="البحث في النظام..."
          />
        </div>
      </div>
    </header>
  )
}

export default Header