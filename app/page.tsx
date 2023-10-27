import { Logo } from "@/components/Logo";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <section className="flex min-h-screen flex-col bg-gray-50">
      <header className="transition-shadows fixed top-0 z-20 flex w-full justify-between py-5 px-10 backdrop-blur-xl duration-300 sm:py-7">
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
      </header>
      <main className="flex flex-1 justify-center items-center px-10 pt-32 pb-20 sm:pb-32 sm:pt-48 xl:px-36 flex-col">
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
            style={{ objectFit: "contain" }}
            alt="Picture of the author"
          />
        </div>
      </main>
      <footer></footer>
    </section>
  );
}
