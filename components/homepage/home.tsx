import { redirect } from "next/navigation";

const HomePage = ({ data }: any) => {
  redirect(`/${data.organizations[0]._id}`);

  return <div></div>;
};

export default HomePage;
