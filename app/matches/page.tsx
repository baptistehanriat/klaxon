'use client'

import { useCarpoolMatches, type Match } from '@/lib/useCarpoolMatches'
import { ContactColleagueDialog } from '@/components/ContactColleagueDialog'
import { MatchCard } from '@/components/MatchCard'
import { useUser } from '@/lib/useUser'
import { useEffect } from 'react'

export default function Matches() {
  const user = useUser()
  const { matches, loading } = useCarpoolMatches(user)
  console.log('matches', user, matches, loading)

  useEffect(() => {
    console.log('loading', loading)
  }, [loading])
  return (
    <div>
      <div>
        <div className="text-2xl font-bold my-10">
          Mes collègues avec qui je peux covoiturer
        </div>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="flex-col flex">
            {matches.map((match: any) => (
              <Match key={match.userX.id} {...match} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Match(match: Match) {
  return (
    <ContactColleagueDialog
      trigger={<MatchCard match={match} />}
      match={match}
    />
  )
}
