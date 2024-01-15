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
        <div className="m-1 rounded-xl">
          <DialogHeader>
            <DialogTitle>{`Covoiturer avec ${match.userX.name}`}</DialogTitle>
            <DialogClose></DialogClose>
          </DialogHeader>
          <DialogBody>
            <div className="flex flex-col gap-3">
              <button className="w-full flex gap-3 justify-between font-medium text-base items-center rounded-xl px-4 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300">
                {match.userX.email}
                <DocumentDuplicateIcon width={20} />
              </button>

              {match.userX.phone_number && (
                <button className="w-full flex gap-3 justify-between font-medium text-base items-center rounded-xl px-4 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300">
                  {match.userX.phone_number}
                  <DocumentDuplicateIcon width={20} />
                </button>
              )}
            </div>
          </DialogBody>
        </div>
      </DialogContent>
    </Dialog>
  )
}
