import { Database } from '@/lib/types'
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { AdditionnalTimeSlider } from './AdditionalTimeSlider'
import { AddressPicker } from './AddressPicker'
import { Button } from './ui/button'
import { Combobox } from './ui/combobox'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

export async function EditCommuteDialog() {
  // const { data, setFieldValue, currentStep, onSubmit } = useOnboardingForm()
  // const { officeAddresses, loading, error } = useOfficeAddresses()
  const supabase = createServerComponentClient<Database>({ cookies })

  const userSession = await supabase.auth.getSession()
  const userId = userSession?.data.session?.user.id

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId!)
    .single()

  const offices = await supabase.from('offices').select('*')

  const updateProfile = async (formData: FormData) => {
    'use server'
    const name = String(formData.get('home-address'))
    const detour = Number(formData.get('detour'))
    const homeAddress = String(formData.get('home-address-data'))

    console.log('name', homeAddress)
    const supabase = createServerActionClient<Database>({ cookies })
    const { data } = await supabase.auth.getUser()
    await supabase
      .from('users')
      .update({ home_address: name, detour_max: detour })
      .eq('id', data.user?.id || '')
    revalidatePath('/')
  }

  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-sm">Modifier mon trajet</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier mon trajet</DialogTitle>
          <DialogClose></DialogClose>
        </DialogHeader>
        <form className="w-full flex flex-col gap-8" action={updateProfile}>
          <DialogBody>
            <div className="flex flex-col gap-2">
              <label htmlFor="home-address" className="text-sm font-semibold">
                Adresse de départ
              </label>
              <AddressPicker defaultValue={userData?.home_address || ''} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">
                Agence de destination
              </label>
              <Combobox
                options={
                  offices?.data?.map((address) => ({
                    value: address.id,
                    label: address.address,
                  })) || []
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="detour" className="text-sm font-semibold">
                Temps de trajet additionnel
              </label>
              <p className="text-sm text-gray-400">
                Durée maximale du détour que je peux faire pour rejoindre un
                co-voitureur.
              </p>
              <AdditionnalTimeSlider initialValue={userData?.detour_max || 0} />
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <div className="flex justify-end items-center gap-3">
                <Button size="sm" variant="secondary">
                  Annuler
                </Button>
                <Button type="submit" size="sm">
                  Sauvegarder
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
