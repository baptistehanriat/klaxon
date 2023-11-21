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
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { ComboboxText } from './ComboboxTest'

export function EditCommuteDialog() {
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
        <div className="flex flex-col gap-4">
          <label htmlFor="home-address" className="text-gray-400 text-sm mb-1">
            Votre point de départ
          </label>
          <AddressPicker onChange={() => {}} />
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
