import { useState, useEffect } from 'react'
import { supabase } from './supabase'

interface User {
  id: string
  email: string
  first_name: string
  home_address: string
  office_address: string
  detour_max: number
}

export const useUser = () => {
  const [userData, setUserData] = useState<User>({
    id: '',
    email: '',
    first_name: '',
    home_address: '',
    office_address: '',
    detour_max: 0,
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await supabase.auth.getUser()

      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
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
