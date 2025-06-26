
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle";


export default function Home() {
  return (
    <div>
      <div className="m-3 flex gap-3">
        <ModeToggle></ModeToggle>
        <Button className="bg">Click me</Button>
      </div>
    
    </div>
  );
}
