import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";

export default function SignupPage() {
  return (
    <section className="flex max-h-screen items-center flex-col">
      <main className="flex flex-col justify-center items-center h-screen bg-red-50 max-w-[800px]">
        <Logo />
        Créer un compte
        <Input placeholder="Email" type="email" />
        <Button className="w-full">Continue</Button>
        <Link href="/help">Vous avez besoin d'aide pour vous inscrire ?</Link>
      </main>
      <footer>
        <div>
          Vous avez un compte ?<br></br>
          <Link href="/login">Connectez-vous.</Link>
        </div>
      </footer>
    </section>
  );
}
