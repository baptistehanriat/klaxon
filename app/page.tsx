'use client'

import { Logo } from '@/components/Logo'
import { MicrosoftIcon } from '@/components/MicrosoftIcon'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LandingPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const handleSignIn = async () => {
    const session = await supabase.auth.signInWithPassword({
      email: 'bhanriat@gmail.com',
      password: 'Passw0rd!',
    })
    if (!session.error) {
      router.push('/dashboard')
      router.refresh()
    }
    console.log(session)
  }
  return (
    <section className="flex min-h-screen bg-white">
      <div className="flex w-full bg-gray-100 m-8 rounded-3xl p-11 items-center ">
        <div className="text-3xl font-bold tracking-tight delay-500 sm:text-7xl mb-10">
          Klaxon, l'app qui rapproche
          <br />
          vos collaborateurs
          <br />
          sur la route du bureau !
        </div>
      </div>

      <div className="flex w-full items-center justify-center flex-col">
        <div className="flex  flex-col  items-center w-full justify-center sm:max-w-[336px]">
          <Logo />

          <div className="text-2xl font-bold mb-2 mt-5">
            Bienvenue sur Klaxon 👋
          </div>
          <div className="border border-purple-300 rounded-lg py-1 px-3 text-xs font-semibold text-purple-500 bg-purple-100 mb-6">
            🚧 | Prototype
          </div>
          <Button
            className="w-full mt-5 flex gap-6"
            onClick={handleSignIn}
            variant="outline"
          >
            <MicrosoftIcon />
            Se connecter avec microsoft
          </Button>
        </div>
      </div>
    </section>
  )
}

{
  /* <header className="transition-shadows fixed top-0 z-20 flex w-full justify-between py-5 px-10 backdrop-blur-xl duration-300 sm:py-7">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-3">
            <Logo />
            <p className="text-2xl font-bold tracking-tight delay-500">
              klaxon
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <Button asChild>
              <Link href="/login">
                Connexion
                <ArrowRight width={16} strokeWidth={3} />
              </Link>
            </Button>
          </div>
        </div>
      </header> */
}
{
  /* <main className="flex flex-1 justify-center items-center px-10 pt-32 pb-20 sm:pb-32 sm:pt-48 xl:px-36 flex-col">
        <div className="text-3xl font-bold tracking-tight delay-500 sm:text-7xl mb-10">
          L'app qui rapproche
          <br />
          vos collaborateurs
          <br />
          sur la route du bureau !
        </div>
        <div className="flex bg-white rounded-3xl p-2 mt-10 h-[720px] w-[1220px]">
          <Image
            src="/31611.jpg"
            width={1220}
            height={720}
            style={{ objectFit: 'contain' }}
            alt="Picture of the author"
          />
        </div>
      </main>
      <footer></footer> */
}
