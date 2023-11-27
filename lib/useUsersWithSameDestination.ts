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
  console.log('userId', userId === '6ad5a8f0-3414-4cce-b635-4146abc26de2')
  useEffect(() => {
    const fetchUsersWithSameDestination = async () => {
      if (!userId) {
        return
      } else {
        console.log('toto', userId)
      }
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
    fetchUsersWithSameDestination()
  }, [userId, destinationId])
  console.log('usersWithSameDestination', usersWithSameDestination)
  return usersWithSameDestination
}
