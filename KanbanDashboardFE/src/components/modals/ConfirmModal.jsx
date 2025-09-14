import Modal from "./Modal";
import "../../styles/components/modals/ConfirmModal.css";

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Are You Sure?">
      <p className="confirm-message">{message}</p>
      <div className="confirm-buttons">
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Yes</button>
      </div>
    </Modal>
  );
}

