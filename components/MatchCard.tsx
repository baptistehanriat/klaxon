'use client'

import { Badge } from '@/components/Badge'
import { Avatar } from '@/components/ui/avatar'
import { type Match } from '@/lib/useCarpoolMatches'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid'
import { Car } from 'lucide-react'

export function MatchCard({ match }: { match: Match }) {
  return (
    <div className="flex items-center justify-between rounded-2xl hover:bg-gray-50 p-4 cursor-pointer">
      <div className="flex items-center gap-4">
        <Avatar>
          <p className="text-base font-bold">B</p>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
        <div>
          <div>{match.userX.name}</div>
        </div>
      </div>
      <div className="flex gap-1">
        <div>{match.canXPickA && <p>Vous êtes sur sa route</p>}</div>
        <div className="flex justify-center items-center h-6 w-6 bg-[#e9f5ff] rounded-lg">
          <Car width={16} color="black" />
        </div>
        {match.canAPickX && (
          <Badge>{'+' + match.additionalTimeForAtoPickX + 'mn'}</Badge>
        )}
      </div>
      <ChatBubbleBottomCenterTextIcon width={24} />
    </div>
  )
}
