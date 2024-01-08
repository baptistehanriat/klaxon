'use client'

import { Logo } from './Logo'
import { UserDropdownMenu } from './UserDropdownMenu'

export function AppBar() {
  return (
    <>
      <div className="flex justify-between px-8 items-center py-4">
        <div className="flex items-center gap-3">
          <Logo />
          <p className="text-2xl font-bold tracking-tight delay-500">klaxon</p>
        </div>
        <UserDropdownMenu />
      </div>
    </>
  )
}
