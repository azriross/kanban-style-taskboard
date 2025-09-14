import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import "../../styles/components/layout/TaskColumns.css";

export default function TaskColumns({ todoTasks, inProgressTasks, doneTasks, onEdit, onDelete }) {

  const renderTasks = (tasks, droppableId) => (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="column"
        >
          {tasks.length === 0 && (
            <p className="no-tasks">No tasks</p>
          )}
          {tasks.map((task, index) => (
            <Draggable
              key={task.id.toString()}
              draggableId={task.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="draggable-task"
                  style={{ ...provided.draggableProps.style }}
                >
                  <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <div className="columns-container">
      <div>
        <h2>To Do</h2>
        {renderTasks(todoTasks, "todo")}
      </div>
      <div>
        <h2>In Progress</h2>
        {renderTasks(inProgressTasks, "inProgress")}
      </div>
      <div>
        <h2>Done</h2>
        {renderTasks(doneTasks, "done")}
      </div>
    </div>
  );
}
