"use client";
import useSWR from "swr";
import { columns } from "./components/bus-route-column";
import BusRouteSideBar from "./components/bus-route-sidebar";
import BusRouteTable from "./components/bus-route-table";
import api from "@/helpers/api";
import { useParams } from "next/navigation";
import { undefined } from "zod";

const BusRoute = () => {
  const fetcher = async (url: string) => {
    const response = await api.get(url);

    return response.data.data.busrouteDetails;
  };

  const { organizationId } = useParams();

  const { data, error, isLoading } = useSWR(
    `/admin/get-bus-routes/${organizationId}`,
    fetcher
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
