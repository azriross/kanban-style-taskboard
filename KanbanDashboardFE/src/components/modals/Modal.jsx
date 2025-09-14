import "../../styles/components/modals/Modal.css";

export default function Modal({ isOpen, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
