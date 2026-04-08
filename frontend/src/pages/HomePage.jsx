import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import Button from '../components/ui/Button.jsx'

function HomePage() {
  const { t } = useLanguage()

  return (
    <section className="page-enter rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-lg md:p-10">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-(--wb-blue)">{t.citizenServicesPortal}</p>
      <h1 className="mt-3 text-3xl leading-tight text-(--wb-blue-deep) md:text-5xl">
        {t.publicServices} <br className="hidden md:block" /> {t.simplifiedBengal}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-slate-700 md:text-lg">
        {t.description}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link to="/book-appointment">
          <Button aria-label="Book a new appointment">{t.bookAppointment}</Button>
        </Link>
        <Link to="/track-status">
          <Button variant="secondary" aria-label="Track existing appointment status">
            {t.trackStatus}
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default HomePage