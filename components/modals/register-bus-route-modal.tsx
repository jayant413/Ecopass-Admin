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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { redirect, useParams, useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useModal } from "@/hooks/use-modal";
import api from "@/helpers/api";
import { mutate } from "swr";

const formSchema = z.object({
  route_name: z.string(),
  route_number: z.string(),
  stops_count: z.string().length(1),
});

export const RegisterBusRoute = () => {
  const { isOpen, type, onClose } = useModal();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [stops, setStops] = useState<string[]>([]);
  const params = useParams();
  const router = useRouter();
  const { organizationId } = useParams();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "registerBusRoute";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      route_name: "",
      route_number: "",
      stops_count: "",
    },
    mode: "onSubmit",
  });

  const isLoading = form.formState.isSubmitting;

  const numberOfStops = () => {
    let count = Number(form.getValues().stops_count);
    setStops(Array(count).fill(null));
    return count;
  };

  useEffect(() => {
    numberOfStops();
  }, [form.getValues().stops_count]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post(
        `/admin/register-bus-route/${organizationId}`,
        {
          route_name: values.route_name,
          route_number: values.route_number,
          stops_count: values.stops_count,
          stops: stops,
        }
      );
      if (response.data.success) {
        router.push(
          `/${organizationId}/bus-routes/${response.data.data._id}/route-pricing`
        );

        onClose();
        toast({ title: "Bus Route registered successfully." });
        router.refresh();
        form.reset();
        mutate(`/admin/get-bus-routes/${organizationId}`);
      } else {
        toast({ title: "Something went wrong." });
      }
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong." });
    }
  };

  const handleOnChangeStops = (event: any, index: number) => {
    let newStops = [...stops];
    newStops[index] = event.target.value;
    setStops(newStops);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Register Bus Route
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Provide bus route details to register
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-x-3  px-6 grid grid-cols-2">
              <div className="translate-x-3 pr-3">
                <FormField
                  control={form.control}
                  name="route_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Bus Route Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Route name"
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
                name="route_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Bus Route Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Route number"
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
                  name="stops_count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Number of Stops
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Including source and destination"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {stops.map((stop, index) => {
                return (
                  <div className="mt-2">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      {index == 0
                        ? "Source"
                        : index == stops.length - 1
                        ? "Destination"
                        : `Stop ${index + 1}`}
                    </Label>
                    <Input
                      type="text"
                      disabled={isLoading}
                      className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      value={stop}
                      onChange={(event) => {
                        handleOnChangeStops(event, index);
                      }}
                      placeholder={`${
                        index == 0
                          ? "Starting point"
                          : index == stops.length - 1
                          ? "Ending point"
                          : `Stop ${index + 1}`
                      }`}
                    />
                  </div>
                );
              })}
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button type="submit" variant="default" disabled={isLoading}>
                Register
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
