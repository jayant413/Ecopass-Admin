"use client";
import useSWR from "swr";
import { columns } from "./components/buses-column";
import BusSideBar from "./components/buses-sidebar";
import BusTable from "./components/buses-table";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import api from "@/helpers/api";
import { useState } from "react";

const Bus = () => {
  const { organizationId } = useParams();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const GET_OrganizationBuses = async (url: string) => {
    try {
      const response = await api.get(url);
      if (response.data.success) {
        return response.data.data.busDetails;
      } else throw new Error("Error while fetching organization bus details");
    } catch (error) {
      toast({ title: "Something went wrong." });
    } finally {
      setIsMounted(true);
    }
  };

  const { data } = useSWR(
    `/admin/get-organization-buses/${organizationId}`,
    GET_OrganizationBuses
  );

  if (!isMounted) return null;

  return (
    <div>
      <div className=" my-5">
        <BusSideBar />
      </div>
      <BusTable columns={columns} data={data} />
    </div>
  );
};

export default Bus;
