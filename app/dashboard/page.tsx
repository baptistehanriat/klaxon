'use client'

import { AppBar } from '@/components/AppBar'
import { Badge } from '@/components/Badge'
import { EditCommuteDialog } from '@/components/EditCommuteDialog'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useCarpoolMatches, type Match } from '@/lib/useCarpoolMatches'
import { useUser } from '@/lib/useUser'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import {
  BuildingOfficeIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  HomeIcon,
} from '@heroicons/react/24/solid'
import { Car } from 'lucide-react'

export default function DashboardPage() {
  const user = useUser()

  const { matches, loading } = useCarpoolMatches(user)
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />

      <div className="flex justify-center w-full rounded-3xl">
        <div className="flex flex-col w-[1000px] ">
          <div className="text-3xl my-10 font-bold">{`Bonjour ${user.name}`}</div>
          <div className="bg-[#f9f8f3] p-12 rounded-3xl  ">
            <div className="flex justify-between items-center mb-8">
              <p className="flex items-center text-2xl font-bold">
                Votre trajet
              </p>
              <EditCommuteDialog />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 ">
                <div className="bg-[#2d2c38] p-3 rounded-2xl w-max">
                  <HomeIcon width={24} color="white" />
                </div>
                <div>
                  <p className="text-lg font-bold">Départ</p>
                  <p className="text-sm ">{user.home_address}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 ">
                <div className="bg-[#2d2c38] p-3 rounded-2xl w-max">
                  <BuildingOfficeIcon width={24} color="white" />
                </div>
                <div>
                  <p className="text-lg font-bold">Arrivée</p>
                  <p className="text-sm ">{user.destination_id.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 ">
                <div className="bg-[#2d2c38] p-3 rounded-2xl w-max">
                  <ClockIcon width={24} color="white" />
                </div>
                <div>
                  <p className="text-lg font-bold">Détour</p>
                  <p className="text-sm ">{user.detour_max}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold my-10">
              Mes collègues avec qui je peux covoiturer
            </div>
            {loading ? (
              <p>Chargement...</p>
            ) : (
              <div className="flex-col flex">
                {matches.map((match: any) => (
                  <Match key={match.userX.id} {...match} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Match(match: Match) {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Contacter ${match.userX.name}`}</DialogTitle>
          <DialogClose></DialogClose>
        </DialogHeader>
        <div className="flex justify-between">
          <Input value={match.userX.email} disabled />
          {/* <Input value="06 06 87 78 78" disabled /> */}
          <Button variant="ghost" size="icon">
            <DocumentDuplicateIcon width={20} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
