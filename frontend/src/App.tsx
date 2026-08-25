import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import PlayersPage from './pages/PlayersPage'
import CoachesPage from './pages/CoachesPage'
import TeamsPage from './pages/TeamsPage'
import AcademiesPage from './pages/AcademiesPage'
import TrainingSchedulePage from './pages/TrainingSchedulePage'
import './index.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-arabic" dir="rtl">
        <div className="flex h-screen overflow-hidden">
          {/* الشريط الجانبي */}
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* المحتوى الرئيسي */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header
              onMenuClick={() => setSidebarOpen(true)}
            />

            <main className="flex-1 relative overflow-y-auto focus:outline-none">
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/players" element={<PlayersPage />} />
                    <Route path="/coaches" element={<CoachesPage />} />
                    <Route path="/teams" element={<TeamsPage />} />
                    <Route path="/academies" element={<AcademiesPage />} />
                    <Route path="/schedule" element={<TrainingSchedulePage />} />
                  </Routes>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App