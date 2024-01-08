import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Database } from '@/lib/types'
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export default async function AccountPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const userSession = await supabase.auth.getSession()
  const userId = userSession?.data.session?.user.id

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId!)
    .single()

  const updateProfile = async (formData: FormData) => {
    'use server'
    const name = String(formData.get('name'))
    const phone_number = String(formData.get('phone_number'))
    const email = String(formData.get('email'))

    const supabase = createServerActionClient<Database>({ cookies })
    const { data } = await supabase.auth.getUser()
    await supabase
      .from('users')
      .update({ name, phone_number, email })
      .eq('id', data.user?.id || '')
    revalidatePath('/')
  }

  return (
    <div className="flex justify-center w-full  h-screen flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Mon compte</h1>
      <form action={updateProfile} className="min-w-[600px]">
        <div className="flex flex-col p-4 pt-4">
          <label htmlFor="profile-picture" className="text-sm font-medium mb-2">
            Photo de profil
          </label>
          <div className="h-24 w-24 rounded-full bg-gray-100 mb-4"></div>
          <label htmlFor="full-name" className="text-sm font-medium mb-2">
            Prénom
          </label>
          <Input name="name" className="mb-4" defaultValue={user?.name || ''} />
          <label htmlFor="email" className="text-sm font-medium mb-2">
            Email
          </label>
          <Input className="mb-4" defaultValue={user?.email || ''} />
          <label htmlFor="email" className="text-sm font-medium mb-2">
            Numéro de téléphone
          </label>
          <Input defaultValue={user?.phone_number || ''} />
        </div>
        <div className="w-full flex justify-between items-center px-4 pb-2">
          <label htmlFor="email" className="text-sm font-medium mb-2">
            Afficher le numéro de téléphone
          </label>
          <Switch defaultChecked={user?.display_phone_number} />
        </div>
        <div className="p-4">
          <button className="text-sm text-red-500">Supprimer le compte</button>
        </div>

        <Button size="sm">Sauvegarder</Button>
      </form>
    </div>
  )
}
