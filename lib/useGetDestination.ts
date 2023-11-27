import { useState, useEffect } from 'react'
import { supabase } from './supabase'

export function useGetDestination({
  destinationId,
}: {
  destinationId: string
}) {
  const [destination, setDestination] = useState({
    id: '',
    address: '',
    name: '',
    coordinates: '',
  })

  useEffect(() => {
    const fetchDestination = async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', destinationId)
        .single()
      if (error) {
        console.error(error)
      } else {
        setDestination(data)
      }
    }
    fetchDestination()
  }, [])
  return destination
}
