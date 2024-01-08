'use client'

import { Input } from '@/components/ui/input'
import { Suggestion, useAddressAutofill } from '@/components/useAddressAutofill'
import { cn } from '@/lib/utils'
import * as React from 'react'

export function AddressPicker({
  onChange,
  errorMessage,
  defaultValue,
}: {
  onChange?: (value: string) => void
  errorMessage?: string
  defaultValue: string
}) {
  const [inputValue, setInputValue] = React.useState(defaultValue)
  const { suggestions, autofill, clearSuggestions } = useAddressAutofill()
  const [activeSuggestionIndex, setActiveSuggestionIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const [addressData, setAddressData] = React.useState<Suggestion>({
    fullAddress: '',
    id: '',
    coordinates: '',
  })
  const [hasSelected, setHasSelected] = React.useState(false)

  // To handle up and down arrow navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'ArrowDown' &&
      activeSuggestionIndex < suggestions.length - 1
    ) {
      setActiveSuggestionIndex((prev: number) => prev + 1)
    } else if (event.key === 'ArrowUp' && activeSuggestionIndex > 0) {
      setActiveSuggestionIndex((prev: number) => prev - 1)
    } else if (event.key === 'Enter' && activeSuggestionIndex > -1) {
      event.preventDefault()
      const selectedSuggestion = suggestions[activeSuggestionIndex]
      if (selectedSuggestion) {
        setInputValue(selectedSuggestion.fullAddress)
        setAddressData(selectedSuggestion)
        setHasSelected(true)
        inputRef.current?.blur()
      }
    } else if (event.key === 'Escape') {
      inputRef.current?.blur()
    }
  }

  React.useEffect(() => {
    if (inputValue.length > 2 && isEditing) {
      autofill(inputValue)
    }
  }, [inputValue, autofill])

  return (
    <div className="relative w-full">
      <Input
        id="home-address"
        name="home-address"
        errorMessage={errorMessage}
        type="text"
        value={inputValue}
        onChange={(e) => {
          setHasSelected(false)
          setInputValue(e.target.value)
        }}
        onFocus={() => setIsEditing(true)}
        onBlur={() => {
          if (!hasSelected) {
            setInputValue('')
            setAddressData({
              fullAddress: '',
              id: '',
              coordinates: '',
            })
          }
          setIsEditing(false)
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        autoComplete="off"
      />
      <input
        type="hidden"
        name="home-address-data"
        value={JSON.stringify(addressData)}
      />
      {isEditing && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="w-full absolute mt-3 rounded-md border bg-popover p-2 z-50"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              role="option"
              aria-selected={index === activeSuggestionIndex}
              onMouseDown={(e) => {
                setInputValue(suggestion.fullAddress)
                setAddressData(suggestion)
                setHasSelected(true)
              }}
              className={cn(
                'cursor-pointer p-2 rounded-md text-sm',
                index === activeSuggestionIndex
                  ? 'bg-gray-200 !important'
                  : 'hover:bg-gray-100 bg-white',
              )}
            >
              {suggestion.fullAddress}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
