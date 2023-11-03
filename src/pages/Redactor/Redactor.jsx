import "./Redactor.scss";
import loadingIcon from "../../assets/icon/loading.svg";
import { redactorInitializer } from "../../grapesjs";
import { useEffect } from "react";
import { Banner, Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { authAsync } from "../../redux/authSlice";
import { openModalByName } from "../../utils/modalUtils";

const Redactor = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const loggedUser = useSelector((state) => state.auth.user);

  function bannerBtnAction(loggedUser) {
    if (!loggedUser) {
      openModalByName(dispatch, "loginModal");
    }
    if (!loggedUser?.email) {
      openModalByName(dispatch, "loginModal");
      return;
    }
    if (!loggedUser?.premium) {
      if (!loggedUser.count > 0) {
        return;
      }
      openModalByName(dispatch, "pricingModal");
      return;
    }
  }

  function resizeRedactor(isPremium) {
    const redactor = document.querySelector("#gjs");
    console.log(isPremium);
    !isPremium
      ? (redactor.style.height = "calc(100vh - 79px)")
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
