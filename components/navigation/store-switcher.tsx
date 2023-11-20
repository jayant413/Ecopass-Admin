"use client";

import * as React from "react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Command,
  CommandGroup,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Building2, Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { useModal } from "@/hooks/use-modal";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

// interface StoreSwitcherProps extends PopoverTriggerProps {
//   items: Store[];
// }

export default function StoreSwitcher({ className, items }: any) {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const formattedItems = items.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));

  const currentStore = formattedItems.find(
    (item: any) => item.value === params.organizationId
  );

  const [open, setOpen] = useState(false);

  const onStoreSelect = (org: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${org.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <Building2 className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search organization..." />
            <CommandEmpty> No organizaions found</CommandEmpty>
            <CommandGroup heading="Organizations">
              {formattedItems.map((org: any) => (
                <CommandItem
                  key={org.value}
                  onSelect={() => onStoreSelect(org)}
                  className={`text-sm ${
                    currentStore?.value === org.value ? "bg-gray-50" : ""
                  }`}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  {org.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === org.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onOpen("createOrganization");
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Organization
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
