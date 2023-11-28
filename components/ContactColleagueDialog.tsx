import { Match } from '@/lib/useCarpoolMatches'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

export function ContactColleagueDialog({
  match,
  trigger,
}: {
  match: Match
  trigger: ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Voyager avec ${match.userX.name}`}</DialogTitle>
          <DialogClose></DialogClose>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-3">
            <div className="bg-purple-100 p-4 rounded-xl flex flex-col justify-center">
              <div className="text-sm font-bold">
                Rejoindre Bastien augmenterai votre trajet de 8mn
              </div>
            </div>

            <button className="w-full flex gap-3 justify-between font-medium text-base items-center rounded-xl px-4 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300">
              {match.userX.email}
              <DocumentDuplicateIcon width={20} />
            </button>

            <button className="w-full flex gap-3 justify-between font-medium text-base items-center rounded-xl px-4 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300">
              {match.userX.email}
              <DocumentDuplicateIcon width={20} />
            </button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
