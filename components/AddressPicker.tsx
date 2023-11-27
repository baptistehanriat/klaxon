'use client'

import { Input } from '@/components/ui/input'
import { useAddressAutofill } from '@/components/useAddressAutofill'
import { cn } from '@/lib/utils'
import * as React from 'react'

export function AddressPicker({
  onChange,
  errorMessage,
}: {
  onChange: (value: string) => void
  errorMessage?: string
}) {
  const [inputValue, setInputValue] = React.useState('')
  const { suggestions, autofill } = useAddressAutofill()
  const [activeSuggestionIndex, setActiveSuggestionIndex] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [isEditing, setIsEditing] = React.useState(false)

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
      const selectedSuggestion = suggestions[activeSuggestionIndex]?.fullAddress
      if (selectedSuggestion) {
        setInputValue(selectedSuggestion)
        inputRef.current?.blur()
      }
    } else if (event.key === 'Escape') {
      inputRef.current?.blur()
    }
  }

  React.useEffect(() => {
    if (inputValue.length > 2) {
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
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        autoComplete="off"
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
