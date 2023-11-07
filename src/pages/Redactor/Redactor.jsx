import "./Redactor.scss";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { redactorInitializer } from "../../grapesjs";
import { useCallback, useEffect } from "react";
import { Banner } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { openModalByName } from "../../utils/modalUtils";

const Redactor = () => {
  const matches = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.auth.user);

  const bannerBtnAction = useCallback(
    (loggedUser, banner) => {
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
    },
    [dispatch]
  );

  function resizeRedactor(isPremium) {
    const redactor = document.querySelector("#gjs");
    !isPremium
      ? (redactor.style.height = "calc(100vh - 79px)")
      : (redactor.style.height = "100vh");
  }

  useEffect(() => {
    resizeRedactor(loggedUser?.premium);
  }, [dispatch, loggedUser?.premium]);

  useEffect(() => {
    redactorInitializer((data) => bannerBtnAction(data));
  }, [bannerBtnAction]);

  return (
    <main id="redactor-page">
      {matches ? (
        <>
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
