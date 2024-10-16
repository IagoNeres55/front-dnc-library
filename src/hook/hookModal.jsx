import { useState } from "react";

const useModal = () => {
  const [modalState, setModalState] = useState({});

  const openModal = (modalName) => {
    setModalState((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModalState((prev) => ({ ...prev, [modalName]: false }));
  };

  const isModalOpen = (modalName) => !!modalState[modalName];

  return { openModal, closeModal, isModalOpen };
};

export default useModal;
