'use client'

import { off } from 'process'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function SelectOffice({
  offices,
  defaultValue,
}: {
  offices: { value: string; label: string }[]
  defaultValue: string
}) {
  const getDefaultValue = offices.find(
    (office) => office.value === defaultValue,
  )

  return (
    <Select defaultValue={getDefaultValue?.value} name="office">
      <SelectTrigger>
        <SelectValue placeholder="Selectionnez une agence" />
      </SelectTrigger>
      <SelectContent>
        {offices.map((office) => (
          <SelectItem key={office.value} value={office.value}>
            {office.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
