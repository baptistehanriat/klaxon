'use client'

import React from 'react'
import { Slider } from './ui/slider'

export function AdditionnalTimeSlider({
  initialValue,
}: {
  initialValue: number
}) {
  const [value, setValue] = React.useState(initialValue)

  return (
    <div className="flex gap-4 mb-4">
      <Slider
        id="detour"
        name="detour"
        value={[value]}
        onValueChange={(value) => setValue(value[0])}
        step={5}
        min={5}
        max={30}
        className="w-full flex-3"
      />
      <p className="w-full flex-1 text-base font-bold">{value}mn</p>
    </div>
  )
}
