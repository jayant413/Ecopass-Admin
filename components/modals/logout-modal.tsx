"use client";

import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useModal } from "@/hooks/use-modal";
import api from "@/helpers/api";

const LogoutModal = () => {
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type == "logout";

  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await api.get("/admin/logout");
      if (res?.data?.success) {
        toast({ title: "Logged out successfully" });
        router.push("/");
        router.refresh();
      } else toast({ title: "Something went wrong" });
    } catch (error) {
      toast({ title: "Something went wrong" });
    }
    onClose();
  };

  return (
    <AlertDialog open={isModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will log you out form admin dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
