import "./Redactor.scss";
import loadingIcon from "../../assets/icon/loading.svg";
import { redactorInitializer } from "../../grapesjs";
import { useContext, useEffect } from "react";
import { Banner, Loading } from "../../components";
import { GlobalContext } from "../../context";
import { useDispatch, useSelector } from "react-redux";
import { authAsync } from "../../redux/authSlice";

const Redactor = () => {
  const { openLogInModal, openPricingModal } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const loggedUser = useSelector((state) => state.auth.user);

  function bannerBtnAction(loggedUser) {
    if (!loggedUser?.email) {
      openLogInModal();
      return;
    }
    if (!loggedUser?.premium) {
      if (!loggedUser.count > 0) {
        return;
      }
      openPricingModal();
      return;
    }
  }

  function resizeRedactor(isPremium) {
    const redactor = document.querySelector("#gjs");
    !isPremium
      ? (redactor.style = "calc(100vh - 79px)")
      : (redactor.style.height = "100vh");
  }

  useEffect(() => {
    dispatch(authAsync());
    resizeRedactor(loggedUser?.premium);
  }, [dispatch, loggedUser?.premium]);

  useEffect(() => {
    redactorInitializer();
  }, []);

  return (
    <main id="redactor-page">
      {isLoading ? (
        <Loading
          loadingIcon={loadingIcon}
          loadingMessage={"Loading redactor..."}
        />
      ) : null}
      {!loggedUser?.premium ? (
        <Banner bannerBtnAction={() => bannerBtnAction(loggedUser)} />
      ) : null}
      <div id="gjs"></div>
      <div id="blocks"></div>
    </main>
  );
};

export { Redactor };
