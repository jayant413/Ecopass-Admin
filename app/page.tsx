"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login-admin");
  }
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            toast({
              title: "Logged out successfully",
            });
            router.refresh();
          }}
        >
          LogOut
        </Button>
      </div>
    </div>
  );
}
