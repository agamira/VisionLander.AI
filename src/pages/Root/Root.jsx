import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../layout";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export { Root };
