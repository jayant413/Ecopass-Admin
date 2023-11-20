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
  rfid_no: z.string().min(5, { message: "Enter a valid RFID number" }),
  name: z.string().min(1, {
    message: "Passenger name is required",
  }),
  mobile_number: z
    .string()
    .length(10, { message: "Enter a valid mobile number" }),
  aadhaar_no: z
    .string()
    .length(12, { message: "Enter a valid aadhaar number" }),
  email_id: z.string().min(5, { message: "Enter a valid email id" }),
  age: z
    .string()
    .min(1, { message: "Enter a valid age" })
    .max(4, { message: "Enter a valid age" }),
  balance: z.string().min(0),
});

export const RegisterPassenger = () => {
  const { isOpen, type, onClose } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  const isModalOpen = isOpen && type === "registerPassenger";

  const router = useRouter();
  const { organizationId } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rfid_no: "",
      name: "",
      mobile_number: "",
      aadhaar_no: "",
      email_id: "",
      age: "",
      balance: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post(
        `/admin/register-passenger/${organizationId}`,
        {
          rfid_no: values.rfid_no,
          name: values.name,
          mobile_number: values.mobile_number,
          aadhaar_no: values.aadhaar_no,
          email_id: values.email_id,
          age: values.age,
          balance: values.balance,
        }
      );

      if (response.data.success) {
        toast({ title: "Passenger registered successfully" });
        form.reset();
        router.refresh();
        onClose();
      } else {
        toast({ title: "Something went wrong" });
        router.refresh();
      }
    } catch (error: any) {
      if (error.response.status == 409)
        toast({
          title: `${error.response.data.message}`,
        });
      else toast({ title: "Something went wrong" });
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
            Register Passenger
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Provide passenger details to register
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-x-3  px-6 grid grid-cols-2">
              <div className="translate-x-3 pr-3">
                <FormField
                  control={form.control}
                  name="rfid_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Passenger's RFID Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="RFID number"
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
                      Passenger's name
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
                      Passenger's mobile number
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
                      Passenger's Email ID
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
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Passenger's Age
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="number"
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Age"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Passenger's Card Balance
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="number"
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Balance"
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
                        Passenger's Aadhaar Number
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
