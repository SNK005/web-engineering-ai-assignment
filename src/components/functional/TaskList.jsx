import TaskCard from "./TaskCard.jsx";

function TaskList({ tasks, onToggle, onDelete }) {
  return tasks.length === 0 ? (
    <p className="empty">No tasks found. Add one above!</p>
  ) : (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
export default TaskList;
