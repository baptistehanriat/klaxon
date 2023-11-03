'use client'

import { Logo } from '@/components/Logo'
import { StepIndicators } from '@/components/onboarding/StepIndicators'
import { SetCommute } from '@/components/onboarding/SetCommute'
import { SetPassword } from '@/components/onboarding/SetPassword'
import { SetDetour } from '@/components/onboarding/SetDetour'
import {
  useOnboardingForm,
  STEPS,
} from '@/components/onboarding/useOnboardingForm'
import { Button } from '@/components/ui/button'
import { SetName } from '@/components/onboarding/SetName'

export default function OnboardingPage() {
  const { data, setFieldValue, currentStep, onSubmit } = useOnboardingForm()

  return (
    <section className="relative flex flex-col sm:min-h-screen max-h-screen justify-center items-center px-6 pt-16 sm:p-0">
      <main className="flex flex-col w-full sm:max-w-[336px] items-center gap-10">
        <Logo />
        <div className="flex gap-2 flex-col items-center">
          <div className="text-2xl font-bold">Configurez votre compte</div>
          <StepIndicators
            numberOfSteps={4}
            currentStepIndex={STEPS.indexOf(currentStep)}
          />
        </div>
        <div className="w-full">
          {currentStep === 'password' && (
            <SetPassword setValue={setFieldValue} data={data} />
          )}
          {currentStep === 'commute' && (
            <SetCommute setValue={setFieldValue} data={data} />
          )}
          {currentStep === 'detour' && (
            <SetDetour
              setValue={setFieldValue}
              detourTime={data.detour.value}
            />
          )}
          {currentStep === 'profile' && (
            <SetName setValue={setFieldValue} data={data} />
          )}
          <Button className="mt-5 w-full" onClick={onSubmit}>
            Suivant
          </Button>
        </div>
      </main>
    </section>
  )
}
