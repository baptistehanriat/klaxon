import { useEffect, useState } from 'react'
import { User, useUser } from './useUser'
import { useUsersWithSameDestination } from './useUsersWithSameDestination'
import axios from 'axios'

export function useCarpoolMatches(user: User) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const userDetour = user.detour_max

  const usersWithSameDestination = useUsersWithSameDestination({
    destinationId: user.destination_id.id,
    userId: user.id,
  })

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchMatchMaking = async () => {
      setLoading(true)

      if (usersWithSameDestination.length === 0) {
        setLoading(false)
        return
      }

      const colleaguesCoordinates = usersWithSameDestination
        .map((user) => user.home_coordinates)
        .join(';')

      const allCoordinates = `${user.home_coordinates};${colleaguesCoordinates};${user.destination_id.coordinates}`

      const { duration, error: mapboxError } =
        await getCommutesDuration(allCoordinates)

      if (mapboxError || !duration) {
        setLoading(false)
        setError('Error fetching matrix from Mapbox')
        return
      }

      const computedMatches = findMatches({
        usersWithSameDestination,
        durations: duration,
        userDetour,
      })

      setMatches(computedMatches)
      setLoading(false)
    }

    fetchMatchMaking()
  }, [user, usersWithSameDestination])

  return { matches, loading, error }
}

export type Match = {
  userX: User
  canAPickX: boolean
  canXPickA: boolean
  additionalTimeForAtoPickX: number
  additionalTimeForXtoPickA: number
}

function findMatches({
  userDetour,
  usersWithSameDestination,
  durations,
}: {
  userDetour: number
  usersWithSameDestination: User[]
  durations: number[][]
}) {
  const destinationIndex = durations[0].length - 1 // Last column index
  const currentUserIndex = 0 // First row index, representing current user

  const timeAtoDestination = durations[currentUserIndex][destinationIndex] // Time from User A to Destination

  const additionalTimeForAtoPickX = new Array(
    usersWithSameDestination.length,
  ).fill(-1)

  const additionalTimeForXtoPickA = new Array(
    usersWithSameDestination.length,
  ).fill(-1)

  for (let x = 1; x < durations.length; x++) {
    // Calculate time for User A to pick up user X
    const timeAtoX = durations[currentUserIndex][x] // Time from User A to User X
    const timeXtoDestination = durations[x][destinationIndex] // Time from User X to Destination

    additionalTimeForAtoPickX[x - 1] = Math.round(
      (timeAtoX + timeXtoDestination - timeAtoDestination) / 60,
    )

    // Calculate time for User X to pick up User A
    const timeXtoA = durations[x][currentUserIndex] // Time from User X to User A
    const timeXtoDestinationDirect = durations[x][destinationIndex] // Direct time from User X to Destination

    additionalTimeForXtoPickA[x - 1] = Math.round(
      (timeXtoA + timeAtoDestination - timeXtoDestinationDirect) / 60,
    )
  }

  const matches = usersWithSameDestination.reduce(
    (acc: Match[], userX, index) => {
      const canAPickX = additionalTimeForAtoPickX[index] < userDetour
      const canXPickA = additionalTimeForXtoPickA[index] < userX.detour_max

      if (canAPickX || canXPickA) {
        acc.push({
          userX,
          canAPickX,
          canXPickA,
          additionalTimeForAtoPickX: additionalTimeForAtoPickX[index],
          additionalTimeForXtoPickA: additionalTimeForXtoPickA[index],
        })
      }

      return acc
    },
    [],
  )

  return matches
}

export async function getCommutesDuration(
  coordinates: string,
): Promise<{ duration: number[][]; error: string }> {
  const curbs = Array(coordinates.split(';').length).fill('curb').join(';')
  try {
    const response = await axios.get(
      `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordinates}?approaches=${curbs}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
    )
    return { duration: response.data.durations as number[][], error: '' }
  } catch (error) {
    console.error('Error fetching address suggestions:', error)
    return { duration: [[]], error: 'Error fetching address suggestions' }
  }
}
