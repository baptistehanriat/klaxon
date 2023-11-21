'use client'

import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <section className="relative flex flex-col sm:min-h-screen max-h-screen justify-center items-center px-6 pt-16 sm:p-0">
      <main className="flex flex-col w-full sm:max-w-[336px] items-center">
        <Button
          asChild
          variant="outline"
          size="icon"
          className="absolute top-5 left-5"
        >
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Logo />
        <div className="text-2xl font-bold mb-10 mt-5">Se connecter</div>
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="text-gray-400 text-sm mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="text-gray-400 text-sm mt-3 mb-1">
            Mot de passe
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link className="text-xs text-indigo-500 mt-1" href="/help">
            Mot de passe oublié ?{' '}
          </Link>
          <Button
            className="w-full mt-5"
            onClick={async () => {
              const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
              })
              if (!error) {
                router.push('/dashboard')
              }
            }}
          >
            Se connecter
          </Button>
        </div>
        <Separator className="my-4" />
        <div></div>
        <Button asChild variant="secondary" className="w-full">
          <Link href="/signup">Première connexion</Link>
        </Button>
      </main>
    </section>
  )
}
