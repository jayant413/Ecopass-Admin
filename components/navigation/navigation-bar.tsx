"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/helpers/api";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import StoreSwitcher from "./store-switcher";

const NavigationBar = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [organizations, setOrganizations] = useState([]);

  const getOrganizations = useCallback(async () => {
    const res = await api.get("/admin/organizations");
    setOrganizations(res?.data?.data?.organizations);
  }, []);

  useEffect(() => {
    getOrganizations();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await api.get("/admin/logout");
      if (res?.data?.success) {
        toast({ title: "Logged out successfully" });
        router.refresh();
      } else toast({ title: "Something went wrong" });
    } catch (error) {
      toast({ title: "Something went wrong" });
    }
  };
  return (
    <div className="border-b-2">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={organizations} />
        {/* <MainNav className="mx-6" /> */}
        <div className="ml-auto flex items-center space-x-4 ">
          {/* <ThemeToggle />
          <UserButton afterSignOutUrl="/" /> */}
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
