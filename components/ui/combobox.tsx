'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function Combobox(props: {
  options: { value: string; label: string }[]
  onChange?: (value: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        className={cn(
          'justify-between flex h-12 w-full rounded-xl border-input  px-3 py-2 bg-gray-100 items-center',
          open ? 'border-2 border-gray-800' : 'border-0',
        )}
      >
        {value ? (
          <p className="truncate text-sm">
            {props.options.find((option) => option.value === value)?.label}
          </p>
        ) : (
          <p className="truncate text-sm text-gray-400">
            Sélectionner une agence...
          </p>
        )}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 " />
      </PopoverTrigger>
      <PopoverContent className="w-[336px]">
        <Command>
          <CommandInput placeholder="Rechercher agence" />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {props.options.map((option) => (
              <CommandItem
                key={option.label}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}
              >
                <p className="truncate">{option.label}</p>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
