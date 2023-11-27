// Assuming you have a hook or context that provides the current user's details
import { supabase } from './supabase'

interface UpdateUserData {
  homeAddress?: string
  officeAddress?: string
  detourMax?: number
}

export async function updateUserData({
  homeAddress,
  officeAddress,
  detourMax,
}: UpdateUserData) {
  // Check if the user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User must be logged in to update their details.')
  }

  // Perform the update operation
  const { data, error } = await supabase
    .from('users')
    .update({
      home_address: homeAddress,
      office_address: officeAddress,
      detour_max: detourMax,
    })
    .eq('id', '6ad5a8f0-3414-4cce-b635-4146abc26de2')

  if (error) {
    throw error
  }

  return data
}
