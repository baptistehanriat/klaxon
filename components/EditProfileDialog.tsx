'use client'

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { updateName } from '@/lib/updateName'
import { useUser } from '@/lib/useUser'
import { DialogClose } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Switch } from './ui/switch'

interface Props {
  isOpen: boolean
  onOpenChange(open: boolean): void
}

export function ProfileDialog(props: Props) {
  const user = useUser()
  const [firstName, setFirstName] = useState(user.name)

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Votre profil</DialogTitle>
        </DialogHeader>
        <DialogBody className="min-h-[400px]">
          <label htmlFor="profile-picture" className="text-sm font-medium mb-2">
            Photo de profil
          </label>
          <div className="h-24 w-24 rounded-full bg-gray-100"></div>
          <label htmlFor="full-name" className="text-sm font-medium mb-2">
            Prénom
          </label>
          <Input
            defaultValue={user.name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="email" className="text-sm font-medium mb-2">
            Email
          </label>
          <Input />
          <label htmlFor="email" className="text-sm font-medium mb-2">
            Numéro de téléphone
          </label>
          <Input />
          <div className="w-full flex justify-between">
            <label htmlFor="email" className="text-sm font-medium mb-2">
              Afficher le numéro de téléphone
            </label>
            <Switch />
          </div>
          <div className="w-full flex justify-between">
            <label htmlFor="email" className="text-sm font-medium mb-2">
              Activer les notifications mails
            </label>
            <Switch />
          </div>

          <div>
            <Button variant="destructive" size="sm">
              Supprimer mon compte
            </Button>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex justify-end items-center gap-4">
              <Button variant="secondary">Annuler</Button>
              <Button onClick={() => updateName({ firstName })}>
                Sauvegarder
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
