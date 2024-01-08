import { useEffect, useState } from 'react'
import { User } from './useUser'
import { supabase } from './supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function useUsersWithSameDestination({
  destinationId,
  userId,
}: {
  destinationId: string
  userId: string
}) {
  const [usersWithSameDestination, setUsersWithSameDestination] = useState<
    User[]
  >([])

  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUsersWithSameDestination = async () => {
      if (userId && destinationId) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .neq('id', userId)
          .eq('destination_id', destinationId)

        console.log('data', data)
        if (error) {
          console.error('error', error)
        } else {
          setUsersWithSameDestination(data)
        }
      }
    }

    fetchUsersWithSameDestination()
  }, [userId, destinationId])

  return usersWithSameDestination
}
