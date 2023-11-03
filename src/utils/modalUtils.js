import { closeModal, openModal } from "../redux/modalsSlice";

const openModalByName = (dispatch, modalName) => {
  dispatch(openModal({ modalName }));
  document.body.style.overflow = "hidden";
};

const closeModalByName = (dispatch, modalName) => {
  dispatch(closeModal({ modalName }));
  document.body.style.overflow = "auto";
};

export { openModalByName, closeModalByName };
