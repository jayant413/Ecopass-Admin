"use client"
import { columns } from "./components/conductors-column";
import ConductorsTable from "./components/conductors-table";
import ConductorSideBar from "./components/conductors-sidebar";
import { useParams } from "next/navigation";
import api from "@/helpers/api";
import { useEffect, useState } from "react";

const Conductors =  () => {
  const { organizationId } = useParams();
  const [conductorDetails, setConductorDetails] = useState([]);


  const getConductorData = async () => {
    const pasdata = await api.get(
      `/admin/get-oranization-all-conductor-details/${organizationId}`
    );

    setConductorDetails(pasdata.data.data.conductorDetails);
  };

  useEffect(() => {
    getConductorData();
  }, []);
  return (
    <div>
      <div className=" my-5">
        <ConductorSideBar />
      </div>
      <ConductorsTable columns={columns} data={conductorDetails} />
    </div>
  );
};

export default Conductors;
