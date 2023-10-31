'use client'

import { AddressPicker } from '@/components/AddressPicker'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAddressAutofill } from '@/components/useAddressAutofill'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type SignupStep = 'email' | 'password' | 'commute' | 'profile'
type SignupData = {
  email: string
  password: string
  name: string
  homeAddress: string
  officeAddress: string
}

export default function SignupPage() {
  const [signupStep, setSignupStep] = useState<SignupStep>('email')
  const [signupData, setSignupData] = useState<SignupData>({
    email: '',
    password: '',
    name: '',
    homeAddress: '',
    officeAddress: '',
  })

  return (
    <section className="relative flex max-h-screen items-center flex-col">
      <main className="flex flex-col justify-center items-center h-screen w-[350px] ">
        <Logo />
        <div className="text-2xl font-bold mb-10 mt-5">Créer un compte</div>
        {signupStep === 'email' && (
          <Email
            onContinue={setSignupStep}
            onChange={setSignupData}
            signupData={signupData}
          />
        )}
        {signupStep === 'password' && (
          <Password
            onContinue={setSignupStep}
            onChange={setSignupData}
            signupData={signupData}
          />
        )}
        {signupStep === 'commute' && (
          <Commute
            onContinue={setSignupStep}
            onChange={setSignupData}
            signupData={signupData}
          />
        )}
        {signupStep === 'profile' && (
          <Profile
            onContinue={() => {}}
            onChange={setSignupData}
            signupData={signupData}
          />
        )}
      </main>
      <footer></footer>
    </section>
  )
}

interface StepContentProps {
  onContinue: (step: SignupStep) => void
  onChange: (data: SignupData) => void
  signupData: SignupData
}

function Email({ onContinue, onChange, signupData }: StepContentProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="email" className="text-gray-400 text-sm mb-1">
        Email professionnel
      </label>
      <Input
        placeholder="nom@entreprise.com"
        id="email"
        name="email"
        type="email"
        onChange={(e) => onChange({ ...signupData, email: e.target.value })}
      />
      <Button className="mt-5 w-full" onClick={() => onContinue('password')}>
        Continuez
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
    </div>
  )
}
function Password({ onContinue, onChange, signupData }: StepContentProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="password" className="text-gray-400 text-sm mb-1">
        Mot de passe
      </label>
      <Input
        placeholder="Mot de passe"
        id="password"
        name="password"
        type="password"
        onChange={(e) => onChange({ ...signupData, password: e.target.value })}
      />
      <Button className="mt-5 w-full" onClick={() => onContinue('commute')}>
        Continuez
      </Button>
    </div>
  )
}

function Commute({ onContinue, onChange, signupData }: StepContentProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="home-address" className="text-gray-400 text-sm mb-1">
        Votre point de départ
      </label>
      <AddressPicker />
      <label htmlFor="office-address" className="text-gray-400 text-sm mb-1">
        L'agence où vous travaillez
      </label>
      <Combobox
        onChange={(value) => onChange({ ...signupData, officeAddress: value })}
        options={[
          { value: 'remix', label: 'Remix' },
          { value: 'astro', label: 'Astro' },
        ]}
      />
      <Button className="mt-5 w-full" onClick={() => onContinue('profile')}>
        Continuez
      </Button>
    </div>
  )
}

function Profile({ onContinue, onChange, signupData }: StepContentProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="full-name" className="text-gray-400 text-sm mb-1">
        Prénom
      </label>
      <Input
        placeholder=""
        id="full-name"
        name="full-name"
        type="text"
        onChange={(e) => onChange({ ...signupData, name: e.target.value })}
      />
      <Button className="mt-5 w-full" onClick={() => console.log(signupData)}>
        Continue
      </Button>
    </div>
  )
}
