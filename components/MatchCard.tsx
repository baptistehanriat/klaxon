'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { type Match } from '@/lib/useCarpoolMatches'
import {
  ArrowLongRightIcon,
  ArrowPathRoundedSquareIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline'

import { BuildingOfficeIcon } from '@heroicons/react/24/solid'

import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid'

import { twc } from 'react-twc'

export function MatchCard({
  match,
  userAvatarUrl,
}: {
  match: Match
  userAvatarUrl: string
}) {
  return (
    <div className="flex items-center rounded-2xl hover:bg-gray-50 p-4 cursor-pointer">
      <div className="flex items-center gap-4 min-w-[200px]">
        <Avatar>
          <AvatarImage src={match.userX.avatar_url} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="text-md font-semibold">{match.userX.name}</div>
      </div>
      <div className="flex gap-2 justify-start w-[800px]">
        {match.canXPickA && !match.canAPickX && (
          <>
            <Avatar className="h-6 w-6">
              <AvatarImage src={match.userX.avatar_url} />
            </Avatar>
            <EllipsisHorizontalIcon width={24} />
            <Avatar className="h-6 w-6">
              <AvatarImage src={userAvatarUrl} />
            </Avatar>
            <EllipsisHorizontalIcon width={24} />
            <BuildingOfficeIcon width={24} />
          </>
        )}

        {match.canAPickX && !match.canXPickA && (
          <>
            <Avatar className="h-6 w-6">
              <AvatarImage src={userAvatarUrl} />
            </Avatar>
            <EllipsisHorizontalIcon width={24} />
            <Avatar className="h-6 w-6">
              <AvatarImage src={match.userX.avatar_url} />
            </Avatar>
            <EllipsisHorizontalIcon width={24} />
            <BuildingOfficeIcon width={24} />
          </>
        )}

        {match.canAPickX && match.canXPickA && (
          <>
            <Avatar className="h-6 w-6">
              <AvatarImage src={userAvatarUrl} />
            </Avatar>
            <ArrowPathRoundedSquareIcon width={24} />
            <Avatar className="h-6 w-6">
              <AvatarImage src={match.userX.avatar_url} />
            </Avatar>
            <EllipsisHorizontalIcon width={24} />
            <BuildingOfficeIcon width={24} />
          </>
        )}
      </div>
      <div className="flex gap-1 ">
        {match.canAPickX && (
          <Badge>{'+' + match.additionalTimeForAtoPickX + 'mn'}</Badge>
        )}
      </div>
      <div className="flex  justify-end w-full">
        <ChatBubbleBottomCenterTextIcon width={24} />
      </div>
    </div>
  )
}

const Badge = twc.div`flex justify-between px-2.5 py-0.5 items-center text-xs font-semibold bg-gray-200 rounded-lg`
