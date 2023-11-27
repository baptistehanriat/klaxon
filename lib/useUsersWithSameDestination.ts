import { useEffect, useState } from 'react'
import { User } from './useUser'
import { supabase } from './supabase'

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

  useEffect(() => {
    const fetchUsersWithSameDestination = async () => {
      if (userId && destinationId) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .neq('id', userId)
          .eq('destination_id', destinationId)

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
