import { columns } from "./components/conductors-column";
import ConductorsTable from "./components/conductors-table";
import ConductorSideBar from "./components/conductors-sidebar";
import { ConductorData } from "@/helpers/conductor-data";

const Conductors = async () => {
  return (
    <div>
      <div className=" my-5">
        <ConductorSideBar />
      </div>
      <ConductorsTable columns={columns} data={ConductorData} />
    </div>
  );
};

export default Conductors;
