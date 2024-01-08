import { AppBar } from '@/components/AppBar'
import { EditCommuteDialog } from '@/components/EditCommuteDialog'
import { Matches } from '@/components/Matches'
import { Tables } from '@/lib/types'
import {
  BuildingOfficeIcon,
  ClockIcon,
  HomeIcon,
} from '@heroicons/react/24/solid'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerComponentClient<Tables<'users'>>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const user = await supabase.auth.getUser()

  const { data } = await supabase
    .from('users')
    .select('*, destination_id(*)')
    .eq('id', user.data?.user?.id!)
    .single()

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <div className="flex flex-1 flex-col justify-center p-8 sm:p-0 bg-red-300 items-center  self-center">
        <div className="bg-[#f9f8f3] p-12 rounded-3xl">
          <div className="flex justify-between items-center">
            <EditCommuteDialog />
            <div className="flex items-center gap-4 ">
              <div className="bg-[#2d2c38] p-3 rounded-2xl w-max">
                <HomeIcon width={24} color="white" />
              </div>
              <div>
                <p className="text-lg font-bold">Départ</p>
                <p className="text-sm ">{data?.home_address}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 ">
              <div className="bg-[#2d2c38] p-3 rounded-2xl w-max">
                <BuildingOfficeIcon width={24} color="white" />
              </div>
              <div>
                <p className="text-lg font-bold">Arrivée</p>
                <p className="text-sm ">{data?.destination_id.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 ">
              <div className="bg-[#2d2c38] p-3 rounded-2xl w-max">
                <ClockIcon width={24} color="white" />
              </div>
              <div>
                <p className="text-lg font-bold">Détour</p>
                <p className="text-sm ">{data?.detour_max}</p>
              </div>
            </div>
          </div>
        </div>
        <Matches user={data!} />
      </div>
    </div>
  )
}
