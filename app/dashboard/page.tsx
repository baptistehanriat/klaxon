import { SideBar } from "@/components/SideBar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-6 rounded-3xl m-4">
        <div>Bonjour Baptiste!</div>
        <div className="bg-white p-6 rounded-3xl">
          <div className="text-2xl font-bold">Votre trajet</div>
          <div>Je pars de</div>
          <Input />
          <div>Je vais à</div>
          <Input />
        </div>
        <div className="bg-white p-6 rounded-3xl mt-10">
          <div className="text-2xl font-bold">
            Mes collègues avec qui je peux covoiturer
          </div>
          <div className="flex-col flex">
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
            <Match />
          </div>
        </div>
      </div>
    </div>
  );
}

function Match() {
  return (
    <div className="flex items-center justify-between hover:bg-gray-100 p-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div>Baptiste HANRIAT</div>
          <div>Ingénieur</div>
        </div>
      </div>
      <Button variant="outline" size="icon">
        <MessageCircle />
      </Button>
    </div>
  );
}
