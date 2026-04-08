import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useSession } from '../context/SessionContext.jsx'
import Button from '../components/ui/Button.jsx'
import InputField from '../components/ui/InputField.jsx'

const OFFICIAL_LOGIN = {
  email: 'admin@gmail.com',
  password: 'admin123',
}

function LoginPage() {
  const { t } = useLanguage()
  const { login, loading, error } = useSession()
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginMode, setLoginMode] = useState('citizen')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLoginSubmit = async (data) => {
    setLoginError('')

    if (loginMode === 'official') {
      if (data.email !== OFFICIAL_LOGIN.email || data.password !== OFFICIAL_LOGIN.password) {
        setLoginError(t.loginFailed)
        return
      }
    }

    const result = await login(data.email, data.password)
    if (result.success) {
      navigate(loginMode === 'official' ? '/admin/dashboard' : '/')
    } else {
      setLoginError(result.message)
    }
  }

  return (
    <section className="page-enter mx-auto w-full max-w-md rounded-2xl border border-blue-100 bg-white p-5 shadow-lg sm:p-7">
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-blue-50 p-1">
        <button
          type="button"
          onClick={() => setLoginMode('citizen')}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${loginMode === 'citizen' ? 'bg-white text-(--wb-blue) shadow-sm' : 'text-slate-600'}`}
        >
          {t.citizenLogin}
        </button>
        <button
          type="button"
          onClick={() => setLoginMode('official')}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${loginMode === 'official' ? 'bg-white text-(--wb-blue) shadow-sm' : 'text-slate-600'}`}
        >
          {t.officialLogin}
        </button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-blue-100 p-2 text-(--wb-blue)">
          <ShieldCheck size={20} aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-(--wb-blue-deep)">{t.secureLogin}</h1>
          <p className="text-sm text-slate-600">{loginMode === 'official' ? t.officialLoginNote : t.citizenLogin}</p>
        </div>
      </div>

      {(error || loginError) && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {loginError || error}
        </div>
      )}

      <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-4" noValidate>
        <InputField
          id="email"
          label={t.email}
          type="email"
          placeholder={loginMode === 'official' ? OFFICIAL_LOGIN.email : t.enterEmail}
          aria-label="Email input"
          error={errors.email?.message}
          {...register('email', {
            required: t.emailRequired,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t.invalidEmail,
            },
          })}
        />

        <div>
          <InputField
            id="password"
            label={t.password}
            type={showPassword ? 'text' : 'password'}
            placeholder={loginMode === 'official' ? OFFICIAL_LOGIN.password : t.enterPassword}
            aria-label="Password input"
            error={errors.password?.message}
            {...register('password', {
              required: t.passwordRequired,
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mt-1 text-sm text-slate-600 hover:text-slate-900"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} className="inline mr-1" /> : <Eye size={16} className="inline mr-1" />}
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting || loading} aria-label="Sign in">
          <ShieldCheck size={16} className="mr-2" aria-hidden="true" />
          {isSubmitting || loading ? 'Signing in...' : loginMode === 'official' ? t.officialLogin : t.loginAction}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        {t.dontHaveAccount}{' '}
        <a href="/signup" className="font-semibold text-(--wb-blue) hover:underline">
          {t.goToSignup}
        </a>
      </p>
    </section>
  )
}

export default LoginPage