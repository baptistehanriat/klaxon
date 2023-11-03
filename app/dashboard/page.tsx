import { AppBar } from '@/components/AppBar'
import { Badge } from '@/components/Badge'
import { EditCommuteDialog } from '@/components/EditCommuteDialog'
import { Avatar } from '@/components/ui/avatar'
import {
  BuildingOfficeIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  HomeIcon,
} from '@heroicons/react/24/solid'
import { Car } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <div className="flex justify-center w-full rounded-3xl">
        <div className="flex flex-col w-[1000px] ">
          <div className="text-3xl my-10 font-bold">Bonjour Baptiste</div>
          <div className="bg-[#f9f8f3] p-12 rounded-3xl  ">
            <div className="flex justify-between">
              <div className="text-2xl font-bold mb-8">Votre trajet</div>
              <EditCommuteDialog />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 ">
                <div className="bg-[#2d2c38] p-3 rounded-2xl w-max">
                  <HomeIcon width={24} color="white" />
                </div>
                <div>
                  <p className="text-lg font-bold">Départ</p>
                  <p className="text-sm ">
                    21 Rue Edmond Costedoat
                    <br />
                    33000 Bordeaux
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 ">
                <div className="bg-[#2d2c38] p-3 rounded-2xl w-max">
                  <BuildingOfficeIcon width={24} color="white" />
                </div>
                <div>
                  <p className="text-lg font-bold">Arrivée</p>
                  <p className="text-sm ">Agence de Bordeaux Sud</p>
                </div>
              </div>
              <div className="flex items-center gap-4 ">
                <div className="bg-[#2d2c38] p-3 rounded-2xl w-max">
                  <ClockIcon width={24} color="white" />
                </div>
                <div>
                  <p className="text-lg font-bold">Détour</p>
                  <p className="text-sm ">5mn</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold my-10">
              Mes collègues avec qui je peux covoiturer
            </div>
            <div className="flex-col flex">
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
              <Match />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Match() {
  return (
    <div className="flex items-center justify-between rounded-2xl hover:bg-gray-50 p-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <p className="text-base font-bold">B</p>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
        <div>
          <div>Baptiste</div>
        </div>
      </div>
      <div className="flex gap-1">
        <div className="flex justify-center items-center h-6 w-6 bg-[#e9f5ff] rounded-lg">
          <Car width={16} color="black" />
        </div>
        <Badge>+5 mn</Badge>
      </div>
      {/* <Button variant="outline" size="icon"> */}
      <ChatBubbleBottomCenterTextIcon width={24} />

      {/* </Button> */}
    </div>
  )
}
