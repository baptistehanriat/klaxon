'use client'

import { AddressPicker } from '@/components/AddressPicker'
import { Logo } from '@/components/Logo'
import { SetCommute } from '@/components/onboarding/SetCommute'
import { SetDetour } from '@/components/onboarding/SetDetour'
import { useOnboardingForm } from '@/components/onboarding/useOnboardingForm'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { Slider } from '@/components/ui/slider'
import { useOfficeAddresses } from '@/lib/useOfficeAddresses'

export default function OnboardingPage() {
  const { data, setFieldValue, currentStep, onSubmit } = useOnboardingForm()
  const { officeAddresses, loading, error } = useOfficeAddresses()

  return (
    <section className="relative flex flex-col sm:min-h-screen max-h-screen justify-center items-center px-6 pt-16 sm:p-0">
      <main className="flex flex-col w-full sm:max-w-[336px] items-center gap-10">
        <Logo />
        <div className="flex gap-2 flex-col items-center text-2xl font-bold mb-5">
          Renseignez votre trajet
        </div>
        <div className="w-full">
          <form className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="home-address" className="text-base font-semibold">
                Adresse de départ
              </label>
              <AddressPicker
                errorMessage={data.homeAddress.errorMessage}
                onChange={() => {}}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-semibold">
                Agence de destination
              </label>
              <Combobox
                onChange={() => {}}
                options={officeAddresses.map((address) => ({
                  value: address.id,
                  label: address.address,
                }))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="detour" className="text-base font-semibold">
                Temps de trajet additionnel
              </label>
              <p className="text-sm text-gray-400">
                Durée maximale du détour que je peux faire pour rejoindre un
                co-voitureur.
              </p>
              <div className="flex gap-4">
                <Slider
                  id="detour"
                  name="detour"
                  value={[data.detour.value]}
                  onValueChange={(value) => setFieldValue('detour', value[0])}
                  step={5}
                  min={5}
                  max={60}
                  className="w-full flex-3"
                />
                <p className="w-full flex-1 text-base font-bold">
                  {data.detour.value}mn
                </p>
              </div>
            </div>
            <Button className="mt-5 w-full" onClick={onSubmit}>
              Suivant
            </Button>
          </form>
        </div>
      </main>
    </section>
  )
}
