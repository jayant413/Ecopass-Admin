"use client";
import { columns } from "./components/buses-column";
import BusSideBar from "./components/buses-sidebar";
import BusTable from "./components/buses-table";

const Bus = () => {
  return (
    <div>
      <div className=" my-5">
        <BusSideBar />
      </div>
      <BusTable columns={columns} data={[]} />
    </div>
  );
};

export default Bus;
