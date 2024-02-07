"use client";
import { columns } from "./components/bus-route-column";
import BusSideBar from "./components/bus-route-sidebar";
import BusTable from "./components/bus-route-table";
import api from "@/helpers/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Bus = () => {
  const { organizationId } = useParams();
  const [passengerDetails, setPassengerDetails] = useState([]);

  const getPassengerData = async () => {
    const pasdata = await api.get(
      `/admin/get-oranization-all-passenger-details/${organizationId}`
    );

    setPassengerDetails(pasdata.data.data.passengerDetails);
  };

  useEffect(() => {
    getPassengerData();
  }, []);

  return (
    <div>
      <div className=" my-5">
        <BusSideBar />
      </div>
      <BusTable columns={columns} data={passengerDetails} />
    </div>
  );
};

export default Bus;
