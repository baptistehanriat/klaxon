'use server'

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { Database } from '@/lib/types'

interface Props {
  isOpen: boolean
  onOpenChange: (v: boolean) => void
}

export async function ProfileDialog(props: Props) {
  const updateProfile = async (formData: FormData) => {
    'use server'
    const name = String(formData.get('name'))
    const supabase = createServerActionClient<Database>({ cookies })
    const { data } = await supabase.auth.getUser()
    await supabase
      .from('users')
      .update({ name })
      .eq('id', data.user?.id || '')
    revalidatePath('/')
  }
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Votre profil</DialogTitle>
        </DialogHeader>
        {/* <form action={updateProfile}>
          <DialogBody className="min-h-[400px] p-0">
            <div className="flex flex-col p-4 pt-4">
              <label
                htmlFor="profile-picture"
                className="text-sm font-medium mb-2"
              >
                Photo de profil
              </label>
              <div className="h-24 w-24 rounded-full bg-gray-100 mb-4"></div>
              <label htmlFor="full-name" className="text-sm font-medium mb-2">
                Prénom
              </label>
              <Input name="name" className="mb-4" />
              <label htmlFor="email" className="text-sm font-medium mb-2">
                Email
              </label>
              <Input className="mb-4" />
              <label htmlFor="email" className="text-sm font-medium mb-2">
                Numéro de téléphone
              </label>
              <Input />
            </div>
            <div className="w-full flex justify-between items-center px-4 pb-2">
              <label htmlFor="email" className="text-sm font-medium mb-2">
                Afficher le numéro de téléphone
              </label>
              <Switch />
            </div>
            <div className="w-full flex justify-between items-center px-4">
              <label htmlFor="email" className="text-sm font-medium mb-2">
                Activer les notifications mails
              </label>
              <Switch />
            </div>
            <div className="p-4">
              <button className="text-sm text-red-500">
                Supprimer le compte
              </button>
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <div className="flex justify-end items-center gap-3">
                <Button size="sm" variant="secondary">
                  Annuler
                </Button>
                <Button size="sm">Sauvegarder</Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </form> */}
      </DialogContent>
    </Dialog>
  )
}
