import { useState } from 'react';

const useToggleModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return {
    showModal,
    openModal,
    closeModal,
    modalData,
    setModalData,
  };
};

export default useToggleModal;

