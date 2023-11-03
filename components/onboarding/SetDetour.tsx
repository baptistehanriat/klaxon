import { Slider } from '../ui/slider'
import { type FormData } from './useOnboardingForm'

interface Props {
  setValue: (field: keyof FormData, value: number) => void
  detourTime: number
}

export function SetDetour({ setValue, detourTime }: Props) {
  return (
    <>
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
    </>
  )
}
