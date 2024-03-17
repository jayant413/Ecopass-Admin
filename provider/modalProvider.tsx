"use client";

import { CreateOranizationModal } from "@/components/modals/create-organization-modal";
import LogoutModal from "@/components/modals/logout-modal";
import { RegisterBus } from "@/components/modals/register-bus-modal";
import { RegisterBusRoute } from "@/components/modals/register-bus-route-modal";
import { RegisterConductor } from "@/components/modals/register-conductor-modal";
import { RegisterPassenger } from "@/components/modals/register-passenger-modal";
import { ViewAllStopsModal } from "@/components/modals/view-all-stops-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ViewAllStopsModal />
      <RegisterPassenger />
      <LogoutModal />
      <RegisterConductor />
      <CreateOranizationModal />
      <RegisterBus />
      <RegisterBusRoute />
    </>
  );
};
