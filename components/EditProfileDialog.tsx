'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AddressPicker } from './AddressPicker'
import { Combobox } from './ui/combobox'
import { Slider } from './ui/slider'
import { Button } from './ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { UserCircleIcon } from '@heroicons/react/24/outline'

import { DropdownMenuGroup, DropdownMenuItem } from './ui/dropdown-menu'
import { Input } from './ui/input'

interface Props {
  isOpen: boolean
  onOpenChange(open: boolean): void
}

export function ProfileDialog(props: Props) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Votre profil</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <label htmlFor="home-address" className="text-gray-400 text-sm mb-1">
            Votre prénom
          </label>
          <Input />
          <DialogClose asChild>
            <div className="flex justify-end items-center gap-4">
              <Button variant="secondary">Annuler</Button>
              <Button>Sauvegarder</Button>
            </div>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
