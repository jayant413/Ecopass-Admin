"use client";

import useSWR from "swr";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import api from "@/helpers/api";
import {
  getBackwardCombinations,
  getForwardCombinations,
} from "@/helpers/route-combo";
import { useToast } from "@/components/ui/use-toast";
import RouteSegmentPricing from "./component/route-pricing";
import { Button } from "@/components/ui/button";

interface Segment {
  fromto: string;
  ticketPrice: number | null;
}

const RoutePricing = () => {
  const { routeId, organizationId } = useParams();
  const { toast } = useToast();
  const router = useRouter();

  const [forwardCombo, setForwardCombo] = useState<Segment[]>([]);
  const [backwardCombo, setBackwardCombo] = useState<Segment[]>([]);
  const [dest, setDest] = useState(0);

  const GETRouteDetails = async (url: string) => {
    const response = await api.get(url);

    if (response.data.success) {
      const GETForwardCombo = await getForwardCombinations(
        response.data.data.all_stops
      );
      const GETBackwardCombo = await getBackwardCombinations(
        response.data.data.all_stops
      );

      setForwardCombo(GETForwardCombo);
      setBackwardCombo(GETBackwardCombo);
      setDest(response.data.data.all_stops.length - 1);

      return response.data.data;
    } else {
      toast({ title: "Something went wrong" });
    }
  };

  const { data, error, isLoading } = useSWR(
    `/admin/get-bus-route-details/${routeId}`,
    GETRouteDetails
  );

  const POST_RegisterSegmentTickets = async () => {
    try {
      const response = await api.post(
        `/admin/register-segment-tickets/${organizationId}/${routeId}`,
        {
          source_to_destination: forwardCombo,
          destination_to_source: backwardCombo,
        }
      );

      if (response?.data?.success) {
        router.push(`/${organizationId}/bus-routes`);
        toast({ title: "Segment tickets successfully registered" });
      } else throw new Error("Can't register segment tickets");
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong" });
    }
  };

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="mt-4 space-y-16">
          {" "}
          <RouteSegmentPricing
            combo={forwardCombo}
            setCombo={setForwardCombo}
            dest={dest}
            data={data}
          />
          <RouteSegmentPricing
            combo={backwardCombo}
            setCombo={setBackwardCombo}
            dest={dest}
            data={data}
            reverse
          />
          <div className="m-6 mt-10">
            <Button
              onClick={() => {
                POST_RegisterSegmentTickets();
              }}
            >
              Save Ticket Prices
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutePricing;
