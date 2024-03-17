"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { UserPlus } from "lucide-react";
import { redirect, useParams } from "next/navigation";

const BusSideBar = () => {
  const { onOpen } = useModal();
  const params = useParams();
  return (
    <div className="flex  m-auto w-full justify-between md:pr-10 md:pl-3">
      <div>
        <span className="font-semibold"> Manage Bus Route Details</span>
      </div>
      <div>
        <Button
          onClick={() => {
            onOpen("registerBusRoute");
          }}
        >
          <UserPlus className="mr-2" />
          Register Bus Route
        </Button>
      </div>
    </div>
  );
};

export default BusSideBar;
