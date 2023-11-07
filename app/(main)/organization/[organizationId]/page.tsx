import Mounted from "@/components/mounted";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

const Organizaion = () => {
  const organization = 0;

  if (!organization) return redirect(`/`);

  return (
    <Mounted>
      <LogOut />
    </Mounted>
  );
};

export default Organizaion;
