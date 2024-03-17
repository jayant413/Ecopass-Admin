"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const ViewAllStopsModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const isModalOpen = isOpen && type === "viewallstops";
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Route Number {data?.original?.route_number} All Stops
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Stops between source to destination of route{" "}
            <span className="font-bold"> {data?.original?.route_name}</span>
          </DialogDescription>
          <div className="grid grid-cols-2 space-x-3 space-y-3 my-7">
            {data?.original?.all_stops.map((stop: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`${
                    index == 0 ? "translate-x-3 translate-y-3 mr-3" : ""
                  }`}
                >
                  <Label>
                    {index == 0
                      ? "Source"
                      : index == data?.original?.all_stops.length - 1
                      ? "Destination"
                      : `Stop ${index + 1}`}
                  </Label>
                  <Input value={stop} />
                </div>
              );
            })}
          </div>
        </DialogHeader>
        <DialogFooter className="bg-white px-6 py-4"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
