import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { EditCommuteDialog } from './EditCommuteDialog'
import { ProfileDialog } from './EditProfileDialog'
import {
  QuestionMarkCircleIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import { Separator } from '@/components/ui/separator'

export function UserMenu({
  onOpenProfileDialog,
}: {
  onOpenProfileDialog: VoidFunction
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex gap-2 rounded-full items-center justify-center pr-1 pl-3 py-1 border border-gray-200 hover:bg-gray-100">
          <Bars3Icon width={20} />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>BH</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[180px]">
        <div className="flex gap-2 flex-col ">
          <DropdownMenuItem
            onClick={onOpenProfileDialog}
            className="flex gap-3 mt-2 mx-2"
          >
            <UserCircleIcon width={20} />
            Compte
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem className="mx-2">
            <Link href="/help" className="flex gap-3 ">
              <QuestionMarkCircleIcon width={20} />
              Centre d'aide
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="mx-2 mb-2">
            <Link href="/login" className="flex gap-3">
              <ArrowRightOnRectangleIcon width={20} />
              Se déconnecter
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
