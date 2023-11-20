import HomePage from "@/components/homepage/home";
import { InitialModal } from "@/components/modals/initial-modal";
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

    if (response?.data?.data?.organizations[0]?.name)
      return <HomePage data={response.data.data} />;
    else return <InitialModal />;
  } catch (error) {
    console.log(
      "[(setup)/page.tsx] : Something went wrong while getting organization details"
    );
  }

  return <InitialModal />;
}
