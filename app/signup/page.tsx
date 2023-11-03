'use client'

import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <section className="relative flex flex-col sm:min-h-screen max-h-screen justify-center items-center px-6 pt-16 sm:p-0">
      <main className="flex flex-col w-full sm:max-w-[336px] items-center gap-10">
        <Logo />
        <div className="text-2xl font-bold">Créer un compte</div>
        <form>
          <label htmlFor="email" className="text-gray-400 text-sm mb-1">
            Email professionnel
          </label>
          <Input
            placeholder="nom@entreprise.com"
            id="email"
            name="email"
            type="email"
          />
          <Button
            className="mt-5 w-full"
            onClick={() => console.log('clicked')}
            asChild
          >
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
