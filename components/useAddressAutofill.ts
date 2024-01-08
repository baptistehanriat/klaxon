// useAddressAutofill.ts
import { useState, useCallback } from 'react'
import axios from 'axios'

export type Suggestion = {
  fullAddress: string
  id: string
  coordinates: string
}

interface UseAddressAutofillReturn {
  suggestions: Suggestion[]
  autofill: (query: string) => Promise<void>
  clearSuggestions: () => void
}

export const useAddressAutofill = (): UseAddressAutofillReturn => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  const autofill = useCallback(async (query: string) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query,
        )}.json`,
        {
          params: {
            country: 'fr',
            proximity: 'ip',
            access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
          },
        },
      )
      setSuggestions(
        response.data.features.map((feature: any) => ({
          fullAddress: feature.place_name,
          id: feature.id,
          coordinates: feature.center.join(','),
        })),
      )
    } catch (error) {
      console.error('Error fetching address suggestions:', error)
    }
  }, [])

  return {
    suggestions,
    autofill,
    clearSuggestions: () => setSuggestions([]),
  }
}
