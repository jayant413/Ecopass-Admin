import { InitialModal } from "@/components/modals/initialModal";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const token = cookies().get("token");
  if (!token) redirect("/login-admin");

  return <InitialModal />;
}
