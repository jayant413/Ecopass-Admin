import { useToast } from "@/components/ui/use-toast";
import api from "../api";

export const GET_BusRoutes = async (url: string) => {
  const { toast } = useToast();

  const response = await api.get(url);

  if (response.data.success) {
    return response.data.data.busrouteDetails;
  } else {
    toast({ title: "Something went wrong" });
  }
};
