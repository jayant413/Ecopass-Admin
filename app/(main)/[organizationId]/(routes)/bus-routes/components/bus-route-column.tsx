"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronsUpDown,
  MoreHorizontal,
  Pencil,
  Trash,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal";
import api from "@/helpers/api";
import { useParams, useRouter } from "next/navigation";
import { mutate } from "swr";

export type Bus = {
  _id: string;
  route_number: string;
  route_name: string;
  source: string;
  aadhaar_no: string;
  registered_date: string;
  balance: number;
};

export const columns: ColumnDef<Bus>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "route_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Route number
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "route_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Route Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    header: "Route All Stops",
    id: "view",
    cell: ({ row }) => {
      const { onOpen, type, data } = useModal();
      return (
        <Button
          variant="outline"
          onClick={() => {
            onOpen("viewallstops", row);
          }}
        >
          view
        </Button>
      );
    },
  },
  {
    accessorKey: "number_of_stops",
    header: "Number of Stops",
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      const { organizationId } = useParams();
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                router.push(
                  `/${organizationId}/bus-routes/${row.original._id}/view-bus-route`
                );
              }}
            >
              <User className="h-4 w-4 mr-1" /> View Bus route details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push(
                  `/${organizationId}/bus-routes/${row.original._id}/update-bus-route`
                );
              }}
            >
              <Pencil className="h-4 w-4 mr-1" /> Update Bus route details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => {
                api.put(
                  `/admin/delete-bus-route/${organizationId}/${row.original._id}`
                );
                router.refresh();
                mutate(`/admin/get-bus-routes/${organizationId}`);
              }}
            >
              <Trash className="h-4 w-4 mr-1" /> Delete Bus route details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
