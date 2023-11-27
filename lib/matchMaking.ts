import { use } from 'react'
import { User, useUser } from './useUser'
import { useUsersWithSameDestination } from './useUsersWithSameDestination'
import axios from 'axios'

export async function matchMaking(user: User) {
  const usersWithSameDestination = useUsersWithSameDestination({
    destinationId: user.destination_id.id,
    userId: '6ad5a8f0-3414-4cce-b635-4146abc26de2',
  })

  const detourMax = usersWithSameDestination.map((user) => user.detour_max)

  const coordinates = usersWithSameDestination
    .map((user) => user.home_coordinates)
    .join(';')

  const matrix = await callMapboxMatrixAPI(
    '-122.42,37.78;-122.45,37.91;-122.48,37.73',
  )

  const durations = matrix.durations

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

    additionalTimeForAtoPickX[x - 1] =
      timeAtoX + timeXtoDestination - timeAtoDestination

    // Calculate time for User X to pick up User A
    const timeXtoA = durations[x][currentUserIndex] // Time from User X to User A
    const timeXtoDestinationDirect = durations[x][destinationIndex] // Direct time from User X to Destination

    additionalTimeForXtoPickA[x - 1] =
      timeXtoA + timeAtoDestination - timeXtoDestinationDirect
  }

  const matches = usersWithSameDestination.map((userX, index) => {
    const canAPickX = additionalTimeForAtoPickX[index] < user.detour_max
    const canXPickA = additionalTimeForXtoPickA[index] < userX.detour_max

    if (canAPickX || canXPickA) {
      return {
        userX,
        canAPickX,
        canXPickA,
        additionalTimeForAtoPickX: additionalTimeForAtoPickX[index],
        additionalTimeForXtoPickA: additionalTimeForXtoPickA[index],
      }
    }
  })
}

export async function callMapboxMatrixAPI(coordinates: string): Promise<any> {
  const curbs = Array(coordinates.split(';').length).fill('curb').join(';')

  try {
    const response = await axios.get(
      `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coordinates}?approaches=${curbs}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
    )
    console.log('response', response)
    return response.data
  } catch (error) {
    console.error('Error fetching address suggestions:', error)
  }
}
