import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Bars3Icon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { SignOutMenuItem } from './SignOutMenuItem'

export async function UserDropdownMenu() {
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
          <DropdownMenuItem className="mx-2">
            <Link href="/account" className="flex gap-3 ">
              <UserCircleIcon width={20} />
              Mon compte
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="mx-2">
            <Link href="/help" className="flex gap-3 ">
              <QuestionMarkCircleIcon width={20} />
              Centre d'aide
            </Link>
          </DropdownMenuItem>
          <SignOutMenuItem />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
