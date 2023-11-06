import "./Redactor.scss";
import loadingIcon from "../../assets/icon/loading.svg";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { redactorInitializer } from "../../grapesjs";
import { useEffect } from "react";
import { Banner, Loading } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { authAsync } from "../../redux/authSlice";
import { openModalByName } from "../../utils/modalUtils";

const Redactor = () => {
  const matches = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const loggedUser = useSelector((state) => state.auth.user);

  function bannerBtnAction(loggedUser, banner) {
    if (!loggedUser?.email) {
      openModalByName(dispatch, "loginModal");
      return false;
    }
    if (banner === "banner") {
      if (!loggedUser?.premium) {
        openModalByName(dispatch, "pricingModal");
        return false;
      }
    }
    return true;
  }

  function resizeRedactor(isPremium) {
    const redactor = document.querySelector("#gjs");
    !isPremium
      ? (redactor.style.height = "calc(100vh - 79px)")
      : (redactor.style.height = "100vh");
  }

  useEffect(() => {
    dispatch(authAsync());
    resizeRedactor(loggedUser?.premium);
  }, [dispatch, loggedUser?.premium]);

  useEffect(() => {
    redactorInitializer((data) => bannerBtnAction(data));
  }, []);

  return (
    <main id="redactor-page">
      {matches ? (
        <>
          {isLoading ? (
            <Loading
              loadingIcon={loadingIcon}
              loadingMessage={"Loading redactor..."}
            />
          ) : null}
          {!loggedUser?.premium ? (
            <Banner
              bannerBtnAction={() => bannerBtnAction(loggedUser, "banner")}
            />
          ) : null}
          <div id="gjs"></div>
          <div id="blocks"></div>
        </>
      ) : (
        <h1>Please use Computer</h1>
      )}
    </main>
  );
};

export { Redactor };
