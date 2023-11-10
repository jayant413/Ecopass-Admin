import HomePage from "@/components/homepage/home";
import { InitialModal } from "@/components/modals/initialModal";
import api from "@/helpers/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = cookies().get("token");
  if (!token) redirect("/login-admin");

  try {
    const token = cookies().get("token");

    const response = await api.get("/admin/organizations", {
      headers: {
        Cookie: `token = ${token?.value}`,
      },
    });

    if (response.data.data.organizations[0].name)
      return <HomePage data={response.data.data} token={token} />;
    else return <InitialModal />;
  } catch (error) {
    console.log(
      "Something went wrong while getting organization details",
      error
    );
  }

  return <InitialModal />;
}
