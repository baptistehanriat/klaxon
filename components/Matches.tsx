'use client'

import { useCarpoolMatches, type Match } from '@/lib/useCarpoolMatches'
import { ContactColleagueDialog } from './ContactColleagueDialog'
import { MatchCard } from './MatchCard'
import { Separator } from './ui/separator'

export function Matches({ user }: { user: any }) {
  const { matches, loading } = useCarpoolMatches(user)

  return (
    <div className="w-full">
      <div className="text-xl font-bold mt-10">
        Les personnes qui partagent votre trajet
      </div>
      <Separator className="my-2" />
      {matches.length === 0 ? (
        <div className="w-full flex mt-10 text-center text-lg flex-col">
          Aucune personne ne partage votre trajet pour le moment. Revenez plus
          tard !
        </div>
      ) : loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="flex-col flex">
          {matches.map((match: any) => (
            <Match
              key={match.userX.id}
              match={match}
              userAvatarUrl={user.avatar_url}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function Match({
  match,
  userAvatarUrl,
}: {
  match: Match
  userAvatarUrl: string
}) {
  return (
    <ContactColleagueDialog
      trigger={<MatchCard match={match} userAvatarUrl={userAvatarUrl} />}
      match={match}
    />
  )
}
