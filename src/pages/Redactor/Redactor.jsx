import "./Redactor.scss";
import loadingIcon from "../../assets/icon/loading.svg";
import { redactorInitializer } from "../../grapesjs";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { Banner, Loading } from "../../components";
import { auth } from "../../api";
const Redactor = () => {
  const {
    isLoading,
    setIsLoading,
    loggedUser,
    setLoggedUser,
    openLogInModal,
    openPricingModal,
  } = useContext(GlobalContext);

  function bannerBtnAction(callback) {
    if (!loggedUser?.email) {
      openLogInModal();
      return;
    }
    if (!loggedUser?.premium) {
      openPricingModal();
      return;
    }
    callback();
  }

  useEffect(() => {
    auth()
      .then((res) => {
        if (res.status === 200) {
          setLoggedUser(res);
          setIsLoading(false);
        }
        if (res.status === 404) {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
    redactorInitializer(bannerBtnAction);
  }, [loggedUser, setLoggedUser, setIsLoading]);

  return (
    <main>
      {isLoading ? (
        <Loading
          loadingIcon={loadingIcon}
          loadingMessage={"Loading redactor..."}
        />
      ) : null}
      {!loggedUser?.premium ? (
        <Banner bannerBtnAction={bannerBtnAction} />
      ) : null}
      <div id="gjs"></div>
      <div id="blocks"></div>
    </main>
  );
};

export { Redactor };
