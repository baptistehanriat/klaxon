import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SignupPage() {
  return (
    <section className="flex max-h-screen items-center flex-col">
      <main className="flex flex-col justify-center items-center h-screen sm:w-[350px]">
        <Logo />
        <div className="text-2xl font-bold mb-10 mt-5">Créer un compte</div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-400 text-sm mb-1">
            Email professionnel
          </label>
          <Input
            placeholder="nom@entreprise.com"
            id="email"
            name="email"
            type="email"
          />
          <Button className="mt-5 w-full">Continue</Button>
          <div className="mt-5 text-xs">
            Vous avez besoin d'aide pour vous inscrire ?{" "}
            <Link className="text-indigo-500" href="/help">
              Contactez-nous.
            </Link>
          </div>
          <Separator className="my-10" />
          <div className="text-xs w-full text-center">
            Vous avez déjà un compte ?{" "}
            <Link className="text-indigo-500" href="/login">
              Connectez-vous.
            </Link>
          </div>
        </div>
      </main>
      <footer></footer>
    </section>
  );
}
