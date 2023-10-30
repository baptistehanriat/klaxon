import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function LoginPage() {
  return (
    <section className="relative flex h-screen  items-center justify-center flex-col ">
      <main className="flex flex-col justify-center items-center sm:w-[350px] ">
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
          <Input id="email" name="email" type="email" />
          <label htmlFor="password" className="text-gray-400 text-sm mt-3 mb-1">
            Mot de passe
          </label>
          <Input id="password" name="password" type="password" />
          <Link className="text-xs text-indigo-500 mt-1" href="/help">
            Mot de passe oublié ?{' '}
          </Link>
          <Button className="w-full mt-5" asChild>
            <Link href="/dashboard">Se connecter</Link>
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
