import { useOfficeAddresses } from '@/lib/useOfficeAddresses'
import { AddressPicker } from '../AddressPicker'
import { Combobox } from '../ui/combobox'
import { type FormData } from './useOnboardingForm'

interface StepContentProps {
  setValue: (field: keyof FormData, value: string) => void
  data: FormData
}

export function SetCommute({ setValue, data }: StepContentProps) {
  const { officeAddresses, loading, error } = useOfficeAddresses()
  return (
    <div className="flex flex-col">
      <label htmlFor="home-address" className="text-gray-400 text-sm mb-1">
        Votre point de départ
      </label>
      <AddressPicker
        errorMessage={data.homeAddress.errorMessage}
        onChange={(value) => setValue('homeAddress', value)}
      />
      <label className="text-gray-400 text-sm mb-1 mt-4">
        L'agence où vous travaillez
      </label>
      <Combobox
        onChange={(value) => setValue('officeAddress', value)}
        options={officeAddresses.map((address) => ({
          value: address.id,
          label: address.address,
        }))}
      />
      <div className="flex gap-2 mb-3">
        <label htmlFor="detour" className="flex text-gray-400 text-md mb-1">
          Détour maximum:
        </label>
        <p className="text-md">
          {detourTime < 60 ? detourTime + 'mn' : 'Pas de limite'}
        </p>
      </div>
      <Slider
        id="detour"
        name="detour"
        value={[detourTime]}
        onValueChange={(value) => setValue('detour', value[0])}
        step={5}
        min={5}
        max={60}
      />
    </div>
  )
}
