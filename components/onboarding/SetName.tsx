import { Input } from '../ui/input'
import { type FormData } from './useOnboardingForm'

interface Props {
  setValue: (field: keyof FormData, value: string) => void
  data: FormData
}

export function SetName({ setValue, data }: Props) {
  return (
    <>
      <label htmlFor="full-name" className="text-gray-400 text-sm mb-1">
        Prénom
      </label>
      <Input
        errorMessage={data.name.errorMessage}
        placeholder=""
        id="full-name"
        name="full-name"
        type="text"
        onChange={(e) => setValue('name', e.target.value)}
      />
    </>
  )
}
