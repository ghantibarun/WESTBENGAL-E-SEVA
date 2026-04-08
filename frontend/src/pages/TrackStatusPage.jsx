import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useSession } from '../context/SessionContext.jsx'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
})

function TrackStatusPage() {
  const { t } = useLanguage()
  const { session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const fetchMyBooking = async () => {
      if (!session.token) {
        setBookings([])
        return
      }

      setLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/appointments/mine', {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        })

        setBookings(response.data.appointments || [])
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || t.failedLoadAppointments)
      } finally {
        setLoading(false)
      }
    }

    fetchMyBooking()
  }, [session.token, t.failedLoadAppointments])

  const activeBooking = bookings.find((booking) => booking.status === 'Pending') || bookings[0] || null

  return (
    <section className="page-enter rounded-2xl border border-blue-100 bg-white p-6 shadow-lg">
      <h1 className="text-2xl font-black text-(--wb-blue-deep)">{t.trackStatusTitle}</h1>
      <p className="mt-2 text-sm text-slate-600">{t.trackStatusDesc}</p>

      {!session.token && (
        <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          {t.unauthorized}
        </div>
      )}

      {session.token && loading && <p className="mt-4 text-sm text-slate-600">{t.loadingAppointments}</p>}

      {session.token && error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {session.token && !loading && !error && activeBooking && (
        <div className="mt-4 space-y-2 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
          <p className="text-lg font-black text-(--wb-blue-deep)">{t.currentBooking}</p>
          <p><span className="font-semibold">{t.department}:</span> {activeBooking.department?.name || t.complete}</p>
          <p><span className="font-semibold">{t.date}:</span> {activeBooking.appointmentDate ? new Date(activeBooking.appointmentDate).toLocaleDateString() : t.complete}</p>
          <p><span className="font-semibold">{t.timeSlot}:</span> {activeBooking.timeSlot || t.complete}</p>
          <p><span className="font-semibold">{t.status}:</span> {activeBooking.status}</p>
        </div>
      )}

      {session.token && !loading && !error && !activeBooking && (
        <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          {t.noActiveBooking}
        </div>
      )}
    </section>
  )
}

export default TrackStatusPage