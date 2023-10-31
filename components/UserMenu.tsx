import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { EditCommuteDialog } from './EditCommuteDialog'
import { ProfileDialog } from './EditProfileDialog'
import {
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

export function UserMenu({
  onOpenProfileDialog,
}: {
  onOpenProfileDialog: VoidFunction
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>BH</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onOpenProfileDialog} className="flex gap-2">
          <UserCircleIcon width={20} />
          Profil
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/Help" className="flex gap-2">
            <QuestionMarkCircleIcon width={20} />
            Aide
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/login" className="flex gap-2">
            <ArrowRightOnRectangleIcon width={20} />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
