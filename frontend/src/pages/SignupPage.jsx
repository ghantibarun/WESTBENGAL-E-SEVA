import { Eye, EyeOff, User } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useSession } from '../context/SessionContext.jsx'
import Button from '../components/ui/Button.jsx'
import InputField from '../components/ui/InputField.jsx'

function SignupPage() {
  const { t } = useLanguage()
  const { signup, loading, error } = useSession()
  const navigate = useNavigate()
  const [signupError, setSignupError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password')

  const onSubmit = async (data) => {
    setSignupError('')
    const result = await signup(data.fullName, data.email, data.password)
    if (result.success) {
      navigate('/')
    } else {
      setSignupError(result.message)
    }
  }

  return (
    <section className="page-enter mx-auto w-full max-w-md rounded-2xl border border-blue-100 bg-white p-5 shadow-lg sm:p-7">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-blue-100 p-2 text-(--wb-blue)">
          <User size={20} aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-(--wb-blue-deep)">{t.signup}</h1>
          <p className="text-sm text-slate-600">{t.createAccount}</p>
        </div>
      </div>

      {(error || signupError) && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {signupError || error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <InputField
          id="fullName"
          label={t.fullName}
          type="text"
          placeholder={t.enterFullName}
          aria-label="Full name input"
          error={errors.fullName?.message}
          {...register('fullName', {
            required: t.nameRequired,
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          })}
        />

        <InputField
          id="email"
          label={t.email}
          type="email"
          placeholder={t.enterEmail}
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
            placeholder={t.enterPassword}
            aria-label="Password input"
            error={errors.password?.message}
            {...register('password', {
              required: t.passwordRequired,
              minLength: {
                value: 8,
                message: t.invalidPassword,
              },
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

        <div>
          <InputField
            id="confirmPassword"
            label={t.confirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={t.confirmPassword}
            aria-label="Confirm password input"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: t.confirmPasswordRequired,
              validate: (value) => value === password || t.passwordMismatch,
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="mt-1 text-sm text-slate-600 hover:text-slate-900"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOff size={16} className="inline mr-1" /> : <Eye size={16} className="inline mr-1" />}
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting || loading} aria-label="Create account">
          <User size={16} className="mr-2" aria-hidden="true" />
          {isSubmitting || loading ? t.creatingAccount : t.createAccount}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        {t.alreadyHaveAccount}{' '}
        <a href="/login" className="font-semibold text-(--wb-blue) hover:underline">
          {t.goToLogin}
        </a>
      </p>
    </section>
  )
}

export default SignupPage
