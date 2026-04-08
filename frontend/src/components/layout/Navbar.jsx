import { Building2, LogOut, Menu, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useSession } from '../../context/SessionContext.jsx'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { t } = useLanguage()
  const { session, logout } = useSession()

  const navItems = [
    { label: t.home, path: '/' },
    { label: t.bookAppointment, path: '/book-appointment' },
    { label: t.trackStatus, path: '/track-status' },
  ]

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-blue-950/20 bg-(--wb-blue) text-white shadow-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Go to home page">
          <div className="rounded-full bg-white/10 p-2">
            <Building2 size={20} aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-100">{t.governmentPortal}</p>
            <p className="text-lg font-bold">{t.bengalESeva}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-white text-(--wb-blue)' : 'text-blue-50 hover:bg-white/15'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {session.user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/25"
                aria-label="User profile menu"
              >
                <User size={16} aria-hidden="true" />
                <span className="hidden sm:inline">{session.user.name}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-blue-200 bg-white shadow-lg">
                  <div className="border-b border-slate-200 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">{session.user.name}</p>
                    <p className="text-xs text-slate-600">{session.user.phoneNumber}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <LogOut size={16} aria-hidden="true" />
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-(--wb-blue) hover:bg-blue-50"
            >
              {t.login}
            </Link>
          )}

          <button
            type="button"
            className="rounded-md bg-white/10 p-2 md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="space-y-2 border-t border-white/20 px-4 py-4 md:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-semibold ${
                  isActive ? 'bg-white text-(--wb-blue)' : 'bg-white/10 text-blue-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Navbar