import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ConfirmModal from "../modals/ConfirmModal";
import "../../styles/components/layout/TaskCard.css";

export default function TaskCard({ task, onEdit, onDelete }) {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const createdDate = task.createdAt
    ? new Date(task.createdAt + "Z").toLocaleString()
    : "-";
  const updatedDate = task.updatedAt
    ? new Date(task.updatedAt + "Z").toLocaleString()
    : "-";

  return (
    <>
      <div className="task-card">
        <div className="task-header">
          <h5>{task.title}</h5>
        </div>

        <p className="task-desc">{task.description}</p>

        <div className="task-dates-actions">
          <div className="task-dates">
            <p>Created: {createdDate}</p>
            <p>Updated: {updatedDate}</p>
          </div>
          <div className="task-actions-inline">
            <button onClick={() => onEdit(task)} title="Edit Task">
              <AiOutlineEdit size={20} />
            </button>
            <button onClick={() => setConfirmOpen(true)} title="Delete Task">
              <AiOutlineDelete size={20} />
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          onDelete(task.id);
          setConfirmOpen(false);
        }}
        message={
          <>
            You're about to delete "<strong>{task.title}</strong>"?
          </>
        }
      />
    </>
  );
}
