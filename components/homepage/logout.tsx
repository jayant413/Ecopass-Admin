"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import api from "@/helpers/api";

const LogOut = ({ token }: any) => {
  const router = useRouter();
  const { toast } = useToast();

  const logOutHandler = async () => {
    try {
      const res = await api.get("/admin/logout");
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
    }
  };

  if (!token) {
    router.push("/login-admin");
  }
  return (
    <div>
      <Button
        onClick={() => {
          logOutHandler();
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
