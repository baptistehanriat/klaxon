import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export interface User {
  id: string
  email: string
  name: string
  home_address: string
  destination_id: {
    id: string
    address: string
    name: string
    coordinates: string
  }
  home_coordinates: string
  detour_max: number
}

export const useUser = () => {
  const [userData, setUserData] = useState<User>({
    id: '',
    email: '',
    name: '',
    home_address: '',
    destination_id: {
      id: '',
      address: '',
      name: '',
      coordinates: '',
    },
    home_coordinates: '',
    detour_max: 0,
  })

  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await supabase.auth.getUser()

      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('*, destination_id(*)')
          .eq('id', user.data.user?.id)
          .single()

        if (error) {
          console.error(error)
        } else {
          setUserData(data)
        }
      }
    }

    fetchUserData()
  }, [])

  return userData
}
