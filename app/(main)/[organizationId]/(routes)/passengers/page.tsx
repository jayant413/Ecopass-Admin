import { PassengerData } from "@/helpers/passenger-data";
import { columns } from "./components/passengers-column";
import PassengersSideBar from "./components/passengers-sidebar";
import PassengersTable from "./components/passengers-table";

const Passengers = async () => {
  return (
    <div>
      <div className=" my-5">
        <PassengersSideBar />
      </div>
      <PassengersTable columns={columns} data={PassengerData} />
    </div>
  );
};

export default Passengers;
