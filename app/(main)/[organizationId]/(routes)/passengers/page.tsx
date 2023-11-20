"use client";
import { columns } from "./components/passengers-column";
import PassengersSideBar from "./components/passengers-sidebar";
import PassengersTable from "./components/passengers-table";
import api from "@/helpers/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Passengers = () => {
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
        <PassengersSideBar />
      </div>
      <PassengersTable columns={columns} data={passengerDetails} />
    </div>
  );
};

export default Passengers;
