import { AppBar } from '@/components/AppBar'
import { EditCommuteDialog } from '@/components/EditCommuteDialog'
import { LogoNGE } from '@/components/LogoNGE'
import { Matches } from '@/components/Matches'
import { StickyAppBar } from '@/components/StickyAppBar'
import { UserDropdownMenu } from '@/components/UserDropdownMenu'
import { Tables } from '@/lib/types'
import {
  BuildingOfficeIcon,
  ClockIcon,
  HomeIcon,
} from '@heroicons/react/24/solid'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerComponentClient<Tables<'users'>>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  const user = await supabase.auth.getUser()

  const { data } = await supabase
    .from('users')
    .select('*, destination_id(*)')
    .eq('id', user.data?.user?.id!)
    .single()

  return (
    <div className="relative flex flex-col min-h-screen">
      <StickyAppBar>
        <LogoNGE />
        <div className="border border-purple-300 rounded-lg py-1 px-3 text-xs font-semibold text-purple-500 bg-purple-100">
          🚧 | Prototype
        </div>
        <UserDropdownMenu avatarUrl={data.avatar_url} />
      </StickyAppBar>

      <div className="flex flex-1 flex-col self-center w-full max-w-5xl">
        <h1 className="my-8 sm:text-3xl text-2xl font-bold">{`Bienvenue sur Klaxon ${data?.name} 👋`}</h1>
        <div className="bg-gray-100 border-double border-4 border-white p-10 rounded-3xl">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between">
              <p className="text-2xl font-bold">Votre trajet</p>
              <EditCommuteDialog />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-gray-900 p-3 rounded-2xl w-max">
                  <HomeIcon width={24} color="white" />
                </div>
                <div>
                  <p className="text-lg font-bold">Départ</p>
                  {data.home_address.split(',').map((line: string) => (
                    <p className="text-sm ">{line}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 ">
                <div className="bg-gray-900 p-3 rounded-2xl w-max">
                  <BuildingOfficeIcon width={24} color="white" />
                </div>
                <div>
                  <p className="text-lg font-bold">Agence</p>
                  <p className="text-sm ">{data?.destination_id.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 ">
                <div className="bg-gray-900 p-3 rounded-2xl w-max">
                  <ClockIcon width={24} color="white" />
                </div>
                <div>
                  <p className="text-lg font-bold">Temps additionnel</p>
                  <p className="text-sm ">{data?.detour_max}mn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Matches user={data!} />
      </div>
    </div>
  )
}
