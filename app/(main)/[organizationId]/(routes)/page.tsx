"use client";
import api from "@/helpers/api";
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OrganizaionID = () => {
  const fetchOrganization = async (url: string) => {
    const organizationDetails = await api.get("/admin/organizations");
    const organizaion = organizationDetails.data.data.organizations[0];

    return organizaion;
  };

  const { data, isLoading, error } = useSWR(
    "/admin/organizations",
    fetchOrganization
  );
  return (
    <>
      {data ? (
        <div className=" flex flex-col gap-y-3 my-5 ">
          <span className="font-bold">Organization Dashboard</span>

          <div className="grid grid-cols-2 mt-5 space-x-20 space-y-6  p-8">
            <Card className="col-span-2 translate-x-[4.7rem] w-[95%] ">
              <CardHeader>
                <CardTitle>Organization Name</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl">
                <p>{data.name}</p>
              </CardContent>
            </Card>
            <Card className="flex">
              <CardHeader>
                <CardTitle>Passengers</CardTitle>
                <CardDescription>
                  Organization's passengers count
                </CardDescription>
              </CardHeader>
              <CardContent className="w-[70%] flex justify-center items-center font-bold text-3xl">
                <p>{data.passengers.length}+</p>
              </CardContent>
            </Card>
            <Card className="flex">
              <CardHeader>
                <CardTitle>Conductors</CardTitle>
                <CardDescription>
                  Organization's available conductors count
                </CardDescription>
              </CardHeader>
              <CardContent className=" w-[50%] flex justify-center items-center font-bold text-3xl">
                <p>{data.conductor.length}+</p>
              </CardContent>
            </Card>
            <Card className="flex">
              <CardHeader>
                <CardTitle>Buses</CardTitle>
                <CardDescription>
                  Organization's available buses count
                </CardDescription>
              </CardHeader>
              <CardContent className=" w-[50%] flex justify-center items-center font-bold text-3xl">
                <p> {data.buses.length}+</p>
              </CardContent>
            </Card>
            <Card className="flex">
              <CardHeader>
                <CardTitle>Bus Routes</CardTitle>
                <CardDescription>
                  Organization's available bus routes count
                </CardDescription>
              </CardHeader>
              <CardContent className=" w-[50%] flex justify-center items-center font-bold text-3xl">
                <p>{data.busroutes.length}+</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center font-bold text-xl h-[90vh]">
          {" "}
          Loading...
        </div>
      )}
    </>
  );
};

export default OrganizaionID;

// buses
// busroutes
// conductor
// name
// otherAdmins
// owner
// passengers
