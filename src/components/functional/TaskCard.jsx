import { memo } from "react";

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <li className={"task-card " + (task.completed ? "done" : "")}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="title">{task.title}</span>
      {/* Logical short-circuit: show badge only for high priority */}
      {task.priority === "High" && <span className="badge urgent">Urgent!</span>}
      <span className={"badge " + task.priority.toLowerCase()}>{task.priority}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}
// memo: skip re-render if props did not change
export default memo(TaskCard);
