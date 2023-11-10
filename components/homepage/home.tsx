import LogOut from "./logout";

const HomePage = ({ data, token }: any) => {
  return (
    <div>
      <h3>Welcome to Ecopass onBoarding system</h3>
      <LogOut token={token} />
    </div>
  );
};

export default HomePage;
