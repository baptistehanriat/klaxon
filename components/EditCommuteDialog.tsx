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

export function EditCommuteDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-sm text-gray-500">Modifier</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier mon trajet</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <label htmlFor="home-address" className="text-gray-400 text-sm mb-1">
            Votre point de départ
          </label>
          <AddressPicker />
          <label
            htmlFor="office-address"
            className="text-gray-400 text-sm mb-1"
          >
            L'agence où vous travaillez
          </label>
          <Combobox
            onChange={(value) => console.log('selected value', value)}
            options={[
              { value: 'remix', label: 'Remix' },
              { value: 'astro', label: 'Astro' },
            ]}
          />

          <label
            htmlFor="office-address"
            className="text-gray-400 text-sm mb-1"
          >
            Le temps de détour maximum
          </label>
          <Slider />
          <DialogClose>
            <div className="flex justify-end items-center gap-4">
              <Button variant="secondary">Annuler</Button>
              <Button>Appliquer</Button>
            </div>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
