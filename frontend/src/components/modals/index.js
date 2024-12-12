import AddModal from "./addModal.jsx";
import EditChannelModal from "./editChannelModal.jsx";
import DeleteChannelModal from "./deleteChannelModal.jsx";

const modals = {
  adding: AddModal,
  edit: EditChannelModal,
  delete: DeleteChannelModal,
};

const getModal = (modalName) => modals[modalName];

export default getModal;
