// useAddressAutofill.ts
import { useState, useCallback } from 'react'
import axios from 'axios'

interface AutofillOptions {
  accessToken: string
  proximity?: string
}

interface Suggestion {
  place_name: string
  mapbox_id: string
  // ... other properties from the Mapbox Geocoding API response
}

interface UseAddressAutofillReturn {
  suggestions: Suggestion[]
  autofill: (query: string, options: AutofillOptions) => Promise<void>
}

const useAddressAutofill = (): UseAddressAutofillReturn => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  const autofill = useCallback(
    async (query: string, options: AutofillOptions) => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query,
          )}.json`,
          {
            params: {
              proximity: options.proximity || 'ip',
              access_token:
                'pk.eyJ1IjoiYmhhbnJpYXQiLCJhIjoiY2xvYm10YzdpMHR3NzJpbm56ajlxNnl2eSJ9.zO_-9hTltJ0zkIFmJstS4Q',
            },
          },
        )

        setSuggestions(
          response.data.features.map((feature: any) => ({
            place_name: feature.place_name,
            mapbox_id: feature.id,
            // ... other properties from the feature object
          })),
        )
      } catch (error) {
        console.error('Error fetching address suggestions:', error)
      }
    },
    [],
  )

  return {
    suggestions,
    autofill,
  }
}

export default useAddressAutofill
