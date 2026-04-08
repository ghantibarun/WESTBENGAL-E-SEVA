import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useSession } from '../../context/SessionContext.jsx'
import Button from '../ui/Button.jsx'
import InputField from '../ui/InputField.jsx'
import SkeletonCard from '../ui/SkeletonCard.jsx'
import Spinner from '../ui/Spinner.jsx'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
})

const districts = ['Paschim Medinipur', 'Purba Medinipur', 'Kolkata', 'Hooghly']

const officesByDistrict = {
  'Paschim Medinipur': ['Kharagpur Municipality', 'BLRO Kharagpur', 'RTO Kharagpur'],
  'Purba Medinipur': ['Tamluk Municipality', 'BLRO Tamluk'],
  Kolkata: ['KMC Main Office', 'BLRO Alipore'],
  Hooghly: ['Chinsurah Municipality', 'BLRO Serampore'],
}

const getTomorrowDateInputValue = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const year = tomorrow.getFullYear()
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
  const day = String(tomorrow.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function AppointmentForm() {
  const { t } = useLanguage()
  const { session } = useSession()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    district: '',
    office: '',
    departmentId: '',
    date: '',
    timeSlot: '',
  })
  const [departments, setDepartments] = useState([])
  const [slots, setSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [loadingDepartments, setLoadingDepartments] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const selectedDepartment = useMemo(
    () => departments.find((department) => department._id === formData.departmentId),
    [departments, formData.departmentId],
  )

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoadingDepartments(true)
      setError('')

      try {
        const response = await apiClient.get('/departments')
        setDepartments(response.data.departments || [])
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || t.failedLoadDepartments)
      } finally {
        setLoadingDepartments(false)
      }
    }

    fetchDepartments()
  }, [])

  useEffect(() => {
    const fetchSlots = async () => {
      if (!formData.departmentId || !formData.date) {
        setSlots([])
        return
      }

      setLoadingSlots(true)
      setError('')

      try {
        const response = await apiClient.get('/appointments/slots', {
          params: {
            departmentId: formData.departmentId,
            date: formData.date,
          },
          headers: session.token
            ? {
                Authorization: `Bearer ${session.token}`,
              }
            : {},
        })
        setSlots(response.data.availableSlots || [])
      } catch (fetchError) {
        setError(fetchError.response?.data?.message || t.failedFetchSlots)
      } finally {
        setLoadingSlots(false)
      }
    }

    fetchSlots()
  }, [formData.departmentId, formData.date, session.token])

  const officeOptions = officesByDistrict[formData.district] || []

  const nextStep = () => setStep((value) => Math.min(value + 1, 4))
  const prevStep = () => setStep((value) => Math.max(value - 1, 1))

  const submitAppointment = async () => {
    if (!formData.departmentId || !formData.date || !formData.timeSlot) {
      setError(t.pleaseComplete)
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      await apiClient.post(
        '/appointments',
        {
          departmentId: formData.departmentId,
          serviceType: selectedDepartment?.name || 'General Service',
          appointmentDate: formData.date,
          timeSlot: formData.timeSlot,
        },
        {
          headers: session.token
            ? {
                Authorization: `Bearer ${session.token}`,
              }
            : {},
        },
      )

      setSuccess(t.appointmentSuccess)
    } catch (submitError) {
      setError(submitError.response?.data?.message || t.unableBook)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page-enter rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-black text-(--wb-blue-deep)">{t.bookAppointmentTitle}</h2>
        <p className="text-sm font-medium text-slate-600">{t.stepOf.replace('{step}', step)}</p>
      </div>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-blue-100">
        <div className="h-full bg-(--wb-blue) transition-all" style={{ width: `${(step / 4) * 100}%` }} />
      </div>

      {error && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {success && <p className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">{success}</p>}

      {step === 1 && (
        <div className="space-y-4">
          <label htmlFor="district-select" className="mb-1 block text-sm font-semibold text-slate-700">
            {t.selectDistrict}
          </label>
          <select
            id="district-select"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            value={formData.district}
            onChange={(event) => setFormData((previous) => ({ ...previous, district: event.target.value, office: '' }))}
            aria-label="Select district"
          >
            <option value="">{t.chooseDistrict}</option>
            {districts.map((district) => (
              <option value={district} key={district}>
                {district}
              </option>
            ))}
          </select>

          <label htmlFor="office-select" className="mb-1 block text-sm font-semibold text-slate-700">
            {t.selectOffice}
          </label>
          <select
            id="office-select"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            value={formData.office}
            onChange={(event) => setFormData((previous) => ({ ...previous, office: event.target.value }))}
            aria-label="Select office"
          >
            <option value="">{t.chooseOffice}</option>
            {officeOptions.map((office) => (
              <option value={office} key={office}>
                {office}
              </option>
            ))}
          </select>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          {loadingDepartments ? (
            <div className="grid gap-3">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <select
              id="department-select"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              value={formData.departmentId}
              onChange={(event) => setFormData((previous) => ({ ...previous, departmentId: event.target.value }))}
              aria-label="Select department"
            >
              <option value="">{t.chooseDepartment}</option>
              {departments.map((department) => (
                <option value={department._id} key={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <InputField
            id="appointment-date"
            label={t.selectDate}
            type="date"
            min={getTomorrowDateInputValue()}
            value={formData.date}
            onChange={(event) => setFormData((previous) => ({ ...previous, date: event.target.value, timeSlot: '' }))}
            aria-label="Select appointment date"
          />

          {loadingSlots && (
            <div className="space-y-3">
              <Spinner label={t.fetchingSlots} />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          )}

          {!loadingSlots && (
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">{t.availableSlots}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {slots.length === 0 && (
                  <p className="col-span-full text-sm text-slate-500">{t.noSlotsAvailable}</p>
                )}
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    aria-label={`Select slot ${slot}`}
                    className={`rounded-lg border px-2 py-2 text-sm font-semibold transition ${
                      formData.timeSlot === slot
                        ? 'border-(--wb-blue) bg-(--wb-blue) text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-(--wb-blue)'
                    }`}
                    onClick={() => setFormData((previous) => ({ ...previous, timeSlot: slot }))}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="space-y-2 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
          <h3 className="text-lg font-black text-(--wb-blue-deep)">{t.confirmDetails}</h3>
          <p><span className="font-semibold">{t.district}:</span> {formData.district || t.complete}</p>
          <p><span className="font-semibold">{t.office}:</span> {formData.office || t.complete}</p>
          <p><span className="font-semibold">{t.department}:</span> {selectedDepartment?.name || t.complete}</p>
          <p><span className="font-semibold">{t.date}:</span> {formData.date || t.complete}</p>
          <p><span className="font-semibold">{t.timeSlot}:</span> {formData.timeSlot || t.complete}</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button type="button" variant="secondary" onClick={prevStep} disabled={step === 1} aria-label="Go to previous step">
          {t.previous}
        </Button>

        {step < 4 ? (
          <Button
            type="button"
            onClick={nextStep}
            aria-label="Go to next step"
            disabled={
              (step === 1 && (!formData.district || !formData.office)) ||
              (step === 2 && !formData.departmentId) ||
              (step === 3 && (!formData.date || !formData.timeSlot))
            }
          >
            {t.next}
          </Button>
        ) : (
          <Button type="button" onClick={submitAppointment} disabled={submitting} aria-label="Confirm appointment">
            {submitting ? t.submitting : t.confirmAppointment}
          </Button>
        )}
      </div>
    </section>
  )
}

export default AppointmentForm