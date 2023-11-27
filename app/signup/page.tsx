'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function SignupPage() {
  // const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // If the user is successfully created, add their details to your `users` table.
    if (data) {
      const { error: insertError } = await supabase.from('users').insert([
        {
          id: data.user?.id, // Use the id from the created user in the auth system
          email: data.user?.email,
          // You can add other default or empty fields here as necessary
        },
      ])

      if (insertError) {
        setError(insertError.message)
      } else {
        // Redirect to onboarding page or wherever you want
        // router.push('/onboarding')
      }
    }

    setLoading(false)
  }

  return (
    <section className="relative flex flex-col sm:min-h-screen max-h-screen justify-center items-center px-6 pt-16 sm:p-0">
      <main className="flex flex-col w-full sm:max-w-[336px] items-center gap-10">
        <Logo />
        <div className="text-2xl font-bold">Créer un compte</div>
        <form className="w-full">
          <label htmlFor="email" className="text-gray-400 text-sm mb-1">
            Email professionnel
          </label>
          <Input
            placeholder="nom@entreprise.com"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="text-gray-400 text-sm mb-1">
            Mot de passe
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="mt-5 w-full" onClick={handleSignup} asChild>
            <Link href="/onboarding">Continuez</Link>
          </Button>
          <div className="mt-5 text-xs">
            Vous avez besoin d'aide pour vous inscrire ?{' '}
            <Link className="text-indigo-500" href="/help">
              Contactez-nous.
            </Link>
          </div>
          <Separator className="my-10" />
          <div className="text-xs w-full text-center">
            Vous avez déjà un compte ?{' '}
            <Link className="text-indigo-500" href="/login">
              Connectez-vous.
            </Link>
          </div>
        </form>
      </main>
    </section>
  )
}
