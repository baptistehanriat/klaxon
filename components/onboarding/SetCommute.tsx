import { AddressPicker } from '../AddressPicker'
import { Combobox } from '../ui/combobox'
import { type FormData } from './useOnboardingForm'

interface StepContentProps {
  setValue: (field: keyof FormData, value: string) => void
  data: FormData
}

export function SetCommute({ setValue, data }: StepContentProps) {
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
        options={[
          { value: 'remix', label: 'Remix' },
          { value: 'astro', label: 'Astro' },
        ]}
      />
    </div>
  )
}
