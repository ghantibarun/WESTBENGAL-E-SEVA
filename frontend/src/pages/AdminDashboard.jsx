import axios from 'axios'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useSession } from '../context/SessionContext.jsx'
import Button from '../components/ui/Button.jsx'
import Spinner from '../components/ui/Spinner.jsx'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
})

function AdminDashboard() {
  const { t } = useLanguage()
  const { session, logout } = useSession()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/appointments', {
          headers: session.token
            ? {
                Authorization: `Bearer ${session.token}`,
              }
            : {},
        })
        setAppointments(response.data.appointments || [])
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || t.failedLoadAppointments)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [session.token])

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return appointments
    }

    return appointments.filter((appointment) => {
      const citizenName = appointment.user?.name?.toLowerCase() || ''
      const department = appointment.department?.name?.toLowerCase() || ''
      const tokenId = appointment._id?.slice(-6).toLowerCase() || ''
      return citizenName.includes(query) || department.includes(query) || tokenId.includes(query)
    })
  }, [appointments, search])

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await apiClient.patch(
        `/appointments/${appointmentId}/status`,
        { status },
        {
          headers: session.token
            ? {
                Authorization: `Bearer ${session.token}`,
              }
            : {},
        },
      )

      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment,
        ),
      )
    } catch (updateError) {
      setError(updateError.response?.data?.message || t.failedUpdateStatus)
    }
  }

  return (
    <section className="page-enter rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-black text-(--wb-blue-deep)">{t.adminDashboard}</h1>
        <div className="flex flex-col gap-3 md:w-96 md:flex-row md:items-center">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.searchPhoneToken}
              className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm"
              aria-label="Search appointments"
            />
          </div>
          <Button type="button" variant="secondary" onClick={logout} className="whitespace-nowrap">
            {t.logout}
          </Button>
        </div>
      </div>

      {error && <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {loading && <Spinner label={t.loadingAppointments} />}

      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-blue-100 text-(--wb-blue)">
                <th className="px-2 py-3">{t.citizenName}</th>
                <th className="px-2 py-3">{t.department}</th>
                <th className="px-2 py-3">{t.date}</th>
                <th className="px-2 py-3">{t.timeSlot}</th>
                <th className="px-2 py-3">{t.serviceType}</th>
                <th className="px-2 py-3">{t.status}</th>
                <th className="px-2 py-3">{t.action}</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="border-b border-blue-50">
                  <td className="px-2 py-3 font-semibold">{appointment.user?.name || 'N/A'}</td>
                  <td className="px-2 py-3">{appointment.department?.name || 'N/A'}</td>
                  <td className="px-2 py-3">
                    {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-2 py-3">{appointment.timeSlot}</td>
                  <td className="px-2 py-3">{appointment.serviceType}</td>
                  <td className="px-2 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        appointment.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'Absent'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    {appointment.status === 'Pending' ? (
                      <div className="flex flex-wrap gap-2">
                        <Button type="button" className="px-3 py-1" onClick={() => updateAppointmentStatus(appointment._id, 'Completed')}>
                          {t.markCompleted}
                        </Button>
                        <Button type="button" variant="secondary" className="px-3 py-1" onClick={() => updateAppointmentStatus(appointment._id, 'Absent')}>
                          Mark Absent
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500">{t.complete}</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-2 py-4 text-center text-slate-500">
                    {t.noAppointments}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default AdminDashboard