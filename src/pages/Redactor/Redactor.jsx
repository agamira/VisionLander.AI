import "./Redactor.scss";
import { redactorInitializer } from "../../grapesjs";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { Banner } from "../../components";
const Redactor = () => {
  useEffect(() => {
    redactorInitializer();
  }, []);

  const {
    openLogInModal,
    isLoggedIn,
    openPricingModal,
  } = useContext(GlobalContext);

  function bannerBtnAction() {
    if (!isLoggedIn) {
      openLogInModal();
      return;
    }
    openPricingModal();
  }

  return (
    <main>
      <Banner bannerBtnAction={bannerBtnAction} />
      <div id="gjs"></div>
      <div id="blocks"></div>
    </main>
  );
};

export { Redactor };
