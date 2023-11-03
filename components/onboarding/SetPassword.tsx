import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'
import { type FormData } from './useOnboardingForm'

interface Props {
  setValue: (field: keyof FormData, value: string) => void
  data: FormData
}

export function SetPassword({ setValue, data }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const strenghtPercentage = getPasswordStrength(data.password.value)

  return (
    <>
      <div className="flex justify-between">
        <label htmlFor="password" className="text-gray-400 text-sm mb-1">
          Mot de passe
        </label>
        <p
          className="text-sm text-violet-500 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Masquer' : 'Afficher'}
        </p>
      </div>
      <Input
        errorMessage={data.password.errorMessage}
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => setValue('password', e.target.value)}
      />
      <Progress className="mt-4" value={strenghtPercentage} />
      <p className="text-xs mb-4 mt-1 text-end text-gray-400">Robustesse</p>
      <label htmlFor="confirm-password" className="text-gray-400 text-sm mb-1">
        Confirmez le mot de passe
      </label>
      <Input
        errorMessage={data.confirmPassword.errorMessage}
        id="confirm-password"
        name="confirm-password"
        type="password"
        onChange={(e) => setValue('confirmPassword', e.target.value)}
      />
    </>
  )
}

function getPasswordStrength(password: string): number {
  let criteriaMet = 0

  // Check length
  if (password.length >= 8) {
    criteriaMet++
  }

  // Check for at least one uppercase letter
  if (/[A-Z]/.test(password)) {
    criteriaMet++
  }
  // Check for at least one number
  if (/\d/.test(password)) {
    criteriaMet++
  }

  // Check for at least one symbol
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    criteriaMet++
  }

  return criteriaMet * 25
}
