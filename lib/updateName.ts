// Assuming you have a hook or context that provides the current user's details
import { supabase } from './supabase'

interface UpdateUserData {
  firstName?: string
}

export async function updateName({ firstName }: UpdateUserData) {
  // Check if the user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log(user)
  if (!user) {
    throw new Error('User must be logged in to update their details.')
  }

  // Perform the update operation
  const { data, error } = await supabase
    .from('users')
    .update({
      first_name: firstName,
    })
    .eq('id', '52096c32-cf91-4d96-b149-a0ded8e73436')

  console.log(data, error)
  if (error) {
    throw error
  }

  return data
}
