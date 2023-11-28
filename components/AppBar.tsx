'use client'

import { useState } from 'react'
import { Logo } from './Logo'
import { UserMenu } from './UserMenu'
import { Edit } from 'lucide-react'
import { ProfileDialog } from './EditProfileDialog'

export function AppBar() {
  const [showProfileDialog, setShowProfileDialog] = useState(false)

  return (
    <>
      <div className="flex justify-between px-8 items-center py-4">
        <div className="flex items-center gap-3">
          <Logo />
          <p className="text-2xl font-bold tracking-tight delay-500">klaxon</p>
        </div>
        <UserMenu onOpenProfileDialog={() => setShowProfileDialog(true)} />
      </div>
      <ProfileDialog
        isOpen={showProfileDialog}
        onOpenChange={(v: boolean) => setShowProfileDialog(v)}
      />
    </>
  )
}
