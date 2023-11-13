"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { UserPlus } from "lucide-react";

const PassengersSideBar = () => {
  const { onOpen } = useModal();
  return (
    <div className="flex  m-auto w-full justify-between md:pr-10 md:pl-3">
      <div>
        <span className="font-semibold"> Manage Passenger Details</span>
      </div>
      <div>
        <Button onClick={() => onOpen("registerPassenger")}>
          <UserPlus className="mr-2" />
          Register passenger
        </Button>
      </div>
    </div>
  );
};

export default PassengersSideBar;
