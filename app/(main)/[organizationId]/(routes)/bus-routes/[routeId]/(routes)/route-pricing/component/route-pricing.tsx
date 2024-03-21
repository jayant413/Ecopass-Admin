import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Segment {
  fromto: string;
  ticketPrice: number;
}

const RouteSegmentPricing = ({ data, combo, setCombo, dest, reverse }: any) => {
  return (
    <div>
      {!reverse ? (
        <Label className="space-x-2 font-bold text-2xl text-gray-500 ml-6">
          <span> {data?.all_stops[0]}</span>
          <span>{data ? "to" : "Loading..."}</span>
          <span>{data?.all_stops[dest]}</span>
        </Label>
      ) : (
        <Label className="space-x-2 font-bold text-2xl text-gray-500 ml-6">
          <span>{data?.all_stops[dest]}</span>
          <span>{data ? "to" : "Loading..."}</span>
          <span> {data?.all_stops[0]}</span>
        </Label>
      )}
      <div className="grid grid-cols-3 space-x-7 space-y-8">
        {combo?.map((stop: Segment, index: number) => {
          return (
            <div
              key={index}
              className={index == 0 ? "translate-x-7 translate-y-8 mr-7" : ""}
            >
              <Label>
                <span className="font-bold">{stop.fromto}</span>&nbsp;&nbsp;
                ticket price &nbsp;₹
              </Label>
              <Input
                placeholder="ticket price"
                value={stop.ticketPrice}
                onChange={(e) => {
                  const updatedCombo = [...combo];
                  updatedCombo[index] = {
                    ...updatedCombo[index],
                    ticketPrice: e.target.value,
                  };
                  setCombo(updatedCombo);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RouteSegmentPricing;
