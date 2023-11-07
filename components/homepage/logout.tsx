"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const LogOut = () => {
  const router = useRouter();
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login-admin");
  }
  return (
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
  );
};

export default LogOut;
