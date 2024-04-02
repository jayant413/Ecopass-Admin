"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import api from "@/helpers/api";
import { useToast } from "../ui/use-toast";
import { useModal } from "@/hooks/use-modal";

const formSchema = z.object({
  id_card_no: z.string().min(5, { message: "Enter a valid ID card number" }),
  name: z.string().min(1, {
    message: "Conductor name is required",
  }),
  mobile_number: z
    .string()
    .length(10, { message: "Enter a valid mobile number" }),
  aadhaar_no: z
    .string()
    .length(12, { message: "Enter a valid aadhaar number" }),
  email_id: z.string().min(5, { message: "Enter a valid email id" }),
});

export const RegisterConductor = () => {
  const { isOpen, type, onClose } = useModal();
  const [isMounted, setIsMounted] = useState(false);
  const { organizationId } = useParams();

  const isModalOpen = isOpen && type === "registerConductor";

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_card_no: "",
      name: "",
      mobile_number: "",
      aadhaar_no: "",
      email_id: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post(
        `/admin/register-conductor/${organizationId}`,
        {
          id_card_no: values.id_card_no,
          name: values.name,
          mobile_number: values.mobile_number,
          aadhaar_no: values.aadhaar_no,
          email_id: values.email_id,
        }
      );

      if (response.data.success) {
        toast({ title: "Registered successfully" });
        form.reset();
        router.refresh();
        onClose();
      } else {
        toast({ title: "Something went wrong" });
        router.refresh();
      }
    } catch (error) {
      toast({ title: "Something went wrong" });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Register Conductor
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Provide conductor details to register
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-x-3  px-6 grid grid-cols-2">
              <div className="translate-x-3 pr-3">
                <FormField
                  control={form.control}
                  name="id_card_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Conductor's ID card
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="ID Card"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Conductor's name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Name Surname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Conductor's mobile number
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="number"
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Mobile number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Conductor's Email ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Email id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="aadhaar_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Conductor's Aadhaar Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="number"
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Aadhaar number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="default" disabled={isLoading}>
                Register
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
