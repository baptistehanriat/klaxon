import { useState } from 'react'

export { useOnboardingForm, type FormData, STEPS }

type OnboardingStep = 'password' | 'commute' | 'detour' | 'profile'

const STEPS: OnboardingStep[] = ['password', 'commute', 'detour', 'profile']

const INITIALS_FORM_DATA: FormData = {
  password: {
    value: '',
    errorMessage: undefined,
  },
  confirmPassword: {
    value: '',
    errorMessage: undefined,
  },
  homeAddress: {
    value: '',
    errorMessage: undefined,
  },
  officeAddress: {
    value: '',
    errorMessage: undefined,
  },
  detour: {
    value: 10,
    errorMessage: undefined,
  },
  name: {
    value: '',
    errorMessage: undefined,
  },
}

type Field<T> = {
  value: T
  errorMessage?: string
}

type FormData = {
  password: Field<string>
  confirmPassword: Field<string>
  homeAddress: Field<string>
  officeAddress: Field<string>
  detour: Field<number>
  name: Field<string>
}

const useOnboardingForm = () => {
  const [data, setData] = useState<FormData>(INITIALS_FORM_DATA)
  const [currentStep, setOnboardingStep] = useState<OnboardingStep>('password')

  const onSubmit = () => {
    const isStepValid = validateStep(currentStep)

    if (currentStep !== 'profile') {
      const nextStep = STEPS[STEPS.indexOf(currentStep) + 1]
      if (isStepValid) setOnboardingStep(nextStep)
    }
  }

  const setFieldValue = (field: keyof FormData, value?: string | number) => {
    setData({
      ...data,
      [field]: { ...data[field], value, errorMessage: undefined },
    })
  }

  const validateStep = (step: OnboardingStep): boolean => {
    let updatedData = { ...data }
    let isValid = true

    switch (step) {
      case 'password':
        if (!data.password.value) {
          updatedData.password.errorMessage = 'Le mot de passe est requis'
          isValid = false
        }

        if (data.password.value !== data.confirmPassword.value) {
          updatedData.confirmPassword.errorMessage =
            'Les mots de passe ne correspondent pas'
          isValid = false
        }
        break

      case 'commute':
        if (!data.homeAddress.value) {
          updatedData.homeAddress.errorMessage =
            "L'adresse de départ est requise"
          isValid = false
        }
        if (!data.officeAddress.value) {
          updatedData.officeAddress.errorMessage =
            "L'agence de destination est requise"
          isValid = false
        }
        isValid = true
        break

      case 'profile':
        if (!data.name.value) {
          updatedData.name.errorMessage = 'Le prénom est requis'
          isValid = false
        }
        break

      default:
        break
    }

    setData(updatedData)
    return isValid
  }

  return {
    data,
    setFieldValue,
    currentStep,
    onSubmit,
  }
}
