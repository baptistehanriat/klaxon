'use client'

import { LogoNGE } from './LogoNGE'
import { UserDropdownMenu } from './UserDropdownMenu'

export function AppBar() {
  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 flex justify-between px-8 items-center py-4">
      <div className="flex items-center gap-3">
        <LogoNGE />
      </div>
      <UserDropdownMenu />
    </div>
  )
}
