import { useEffect, useState } from 'react'
import { supabase } from './supabase'

type OfficeAddress = {
  address: string
  id: string
}

export const useOfficeAddresses = () => {
  const [officeAddresses, setOfficeAddresses] = useState<OfficeAddress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getOfficeAddresses = async () => {
      const { data, error: supabaseError } = await supabase
        .from('offices')
        .select('*')
      if (supabaseError) {
        setError('Error fetching office addresses')
      }

      setOfficeAddresses(
        data?.map((address: any) => ({
          address: address.name,
          id: address.id,
        })) || [],
      )
      setLoading(false)
    }
    getOfficeAddresses()
  }, [])

  return {
    officeAddresses,
    loading,
    error,
  }
}
