import { useLanguage } from '../../context/LanguageContext.jsx'

function Footer() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <footer className="mt-10 border-t border-blue-900/20 bg-(--wb-blue-deep) text-blue-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">{t.helpline}</h3>
          <p className="mt-1 text-sm">{t.helplineInfo}</p>
        </div>

        <div className="flex items-center gap-2" aria-label="Language switcher">
          <span className="text-sm text-blue-200">{t.language}:</span>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`rounded-md border px-3 py-1 text-sm font-semibold transition ${language === 'en' ? 'border-white bg-white text-[var(--wb-blue-deep)]' : 'border-white/30 text-white hover:bg-white/10'}`}
            aria-label="Switch language to English"
            aria-pressed={language === 'en'}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('bn')}
            className={`rounded-md border px-3 py-1 text-sm font-semibold transition ${language === 'bn' ? 'border-white bg-white text-[var(--wb-blue-deep)]' : 'border-white/30 text-white hover:bg-white/10'}`}
            aria-label="Switch language to Bengali"
            aria-pressed={language === 'bn'}
          >
            {t.bengali}
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer