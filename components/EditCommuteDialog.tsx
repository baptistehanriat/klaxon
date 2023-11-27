'use client'

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useOfficeAddresses } from '@/lib/useOfficeAddresses'
import { DialogClose } from '@radix-ui/react-dialog'
import { AddressPicker } from './AddressPicker'
import { useOnboardingForm } from './onboarding/useOnboardingForm'
import { Button } from './ui/button'
import { Combobox } from './ui/combobox'
import { Slider } from './ui/slider'

export function EditCommuteDialog() {
  const { data, setFieldValue, currentStep, onSubmit } = useOnboardingForm()
  const { officeAddresses, loading, error } = useOfficeAddresses()

  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-sm">Modifier mon trajet</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier mon trajet</DialogTitle>
          <DialogClose></DialogClose>
        </DialogHeader>
        <DialogBody>
          <form className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="home-address" className="text-sm font-semibold">
                Adresse de départ
              </label>
              <AddressPicker
                errorMessage={data.homeAddress.errorMessage}
                onChange={() => {}}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
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
              <label htmlFor="detour" className="text-sm font-semibold">
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
            <DialogClose asChild>
              <Button className="mt-5 w-full" onClick={() => {}}>
                Modifier
              </Button>
            </DialogClose>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
