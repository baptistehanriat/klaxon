'use client'

import { useCarpoolMatches, type Match } from '@/lib/useCarpoolMatches'
import { ContactColleagueDialog } from './ContactColleagueDialog'
import { MatchCard } from './MatchCard'
import { use, useEffect, useState } from 'react'

export function Matches({ user }: { user: any }) {
  const { matches, loading } = useCarpoolMatches(user)
  const [time, setTime] = useState(new Date())
  console.log('matches', time, loading)

  useEffect(() => {
    console.log('useEffect', user)
  }, [user])
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
