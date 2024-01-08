'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export function SignOutMenuItem() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <DropdownMenuItem className="mx-2 mb-2" onClick={handleSignOut}>
      <ArrowRightOnRectangleIcon width={20} />
      Se déconnecter
    </DropdownMenuItem>
  )
}
