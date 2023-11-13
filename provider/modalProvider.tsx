"use client";

import LogoutModal from "@/components/modals/logout-modal";
import { RegisterPassenger } from "@/components/modals/register-passenger-modal";
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
      <RegisterPassenger />
      <LogoutModal />
    </>
  );
};
