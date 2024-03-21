"use client";
import useSWR, { mutate } from "swr";
import { columns } from "./components/bus-route-column";
import BusRouteSideBar from "./components/bus-route-sidebar";
import BusRouteTable from "./components/bus-route-table";
import api from "@/helpers/api";
import { useParams } from "next/navigation";
import { undefined } from "zod";
import { useToast } from "@/components/ui/use-toast";

const BusRoute = () => {
  const { toast } = useToast();
  const { organizationId } = useParams();

  const GET_BusRoutes = async (url: string) => {
    const response = await api.get(url);

    if (response.data.success) {
      return response.data.data.busrouteDetails;
    } else {
      toast({ title: "Something went wrong" });
    }
  };

  const { data, error, isLoading } = useSWR(
    `/admin/get-bus-routes/${organizationId}`,
    GET_BusRoutes
  );

  return (
    <div>
      <div className=" my-5">
        <BusRouteSideBar />
      </div>
      <BusRouteTable columns={columns} data={data == undefined ? [] : data} />
    </div>
  );
};

export default BusRoute;
