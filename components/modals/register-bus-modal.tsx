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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  bus_number: z.string().length(10, { message: "Enter a valid bus number" }),
  route_name: z.string(),
  route_number: z.string(),
});

export const RegisterBus = () => {
  const { isOpen, type, onClose } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  const isModalOpen = isOpen && type === "registerBus";

  const router = useRouter();
  const { organizationId } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bus_number: "",
      route_name: "",
      route_number: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post(`/admin/register-bus/${organizationId}`, {
        bus_number: values.bus_number,
        route_name: values.route_name,
        route_number: values.route_number,
      });

      if (response.data.success) {
        toast({ title: "Bus registered successfully" });
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
            Register Bus
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Provide bus details to register
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-x-3  px-6 grid grid-cols-2">
              <div className="translate-x-3 pr-3">
                <FormField
                  control={form.control}
                  name="bus_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Bus number
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="text-black placeholder:text-black"
                          placeholder="Bus number"
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
                name="route_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Route name
                    </FormLabel>
                    <FormControl>
                      {/* <Input
                        disabled={isLoading}
                        type="text"
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Route name"
                        {...field}
                      /> */}
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a route name" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Route name</SelectLabel>
                            <SelectItem value="pineapple">
                              no results
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="route_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Route number
                      </FormLabel>
                      <FormControl>
                        {/* <Input
                          disabled={isLoading}
                          type="number"
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Route number"
                          {...field}
                        /> */}
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a route number" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Route name</SelectLabel>
                              <SelectItem value="pineapple">
                                no results
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
