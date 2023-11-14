"use client";

import { useCallback, useEffect, useState } from "react";

import api from "@/helpers/api";
import StoreSwitcher from "./store-switcher";
import { MainNav } from "./main-nav";
import { ProfileDropDown } from "./profile-dropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const NavigationBar = () => {
  const [organizations, setOrganizations] = useState([]);

  const getOrganizations = useCallback(async () => {
    const res = await api.get("/admin/organizations");
    setOrganizations(res?.data?.data?.organizations);
  }, []);

  useEffect(() => {
    getOrganizations();
  }, []);

  return (
    <div className="border-b-2">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={organizations} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center -space-x-1 space-y-1  ">
          <Tooltip>
            <TooltipTrigger>
              <ProfileDropDown />
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white rounded-md px-2 py-1 text-sm">
              <p>Your profile</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
