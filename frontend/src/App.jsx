import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import ProtectedRoute from './components/routing/ProtectedRoute.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AppointmentPage from './pages/AppointmentPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import TrackStatusPage from './pages/TrackStatusPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-(--wb-cream) text-slate-900">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/book-appointment" element={<AppointmentPage />} />
            <Route path="/track-status" element={<TrackStatusPage />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
