"use client"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  const signInPage = ()=>{
    router.push('/signin')
  }

  return (
    <div>
      <div className="m-3 flex gap-3">
        <ModeToggle></ModeToggle>
        <Button className="bg">Click me</Button>
      </div>
    <div className="text-4xl text-center border-2 m-10 p-5 font-bold">
      This is Landing Page !
    </div>
    <div className="text-center">
      <Button onClick={signInPage} className="cursor-pointer">
        Sign In to get Started !
      </Button>
    </div>
    </div>
  );
}
