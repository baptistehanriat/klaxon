'use client'

import { AppBar } from '@/components/AppBar'
import { ContactColleagueDialog } from '@/components/ContactColleagueDialog'
import { EditCommuteDialog } from '@/components/EditCommuteDialog'
import { MatchCard } from '@/components/MatchCard'
import { useCarpoolMatches, type Match } from '@/lib/useCarpoolMatches'
import { useUser } from '@/lib/useUser'
import {
  BuildingOfficeIcon,
  ClockIcon,
  HomeIcon,
} from '@heroicons/react/24/solid'

export default function DashboardPage() {
  const user = useUser()

  const { matches, loading } = useCarpoolMatches(user)
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent" />
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
    <ContactColleagueDialog
      trigger={<MatchCard match={match} />}
      match={match}
    />
  )
}
