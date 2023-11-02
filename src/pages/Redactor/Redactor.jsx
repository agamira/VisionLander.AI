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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loggedUser = useSelector((state) => state.auth.user);

  function bannerBtnAction() {
    if (!isAuthenticated) {
      openLogInModal();
      return;
    }
    if (!loggedUser?.premium) {
      if (!loggedUser?.count > 0) {
        return;
      }
      openPricingModal();
      return;
    }
  }

  useEffect(() => {
    dispatch(authAsync());
    redactorInitializer();
  }, [dispatch]);

  return (
    <main id="redactor-page">
      {isLoading ? (
        <Loading
          loadingIcon={loadingIcon}
          loadingMessage={"Loading redactor..."}
        />
      ) : null}
      {!loggedUser?.premium ? (
        <Banner bannerBtnAction={() => bannerBtnAction()} />
      ) : null}
      <div id="gjs"></div>
      <div id="blocks"></div>
    </main>
  );
};

export { Redactor };
