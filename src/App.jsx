import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import Header from "./components/functional/Header.jsx";
import MetricsSummary from "./components/functional/MetricsSummary.jsx";
import CardWrapper from "./components/functional/CardWrapper.jsx";
import TaskForm from "./components/functional/TaskForm.jsx";
import TaskList from "./components/functional/TaskList.jsx";
import ActivityLogger from "./components/class/ActivityLogger.jsx";

function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [latestAction, setLatestAction] = useState("");

  const pending = tasks.filter((t) => !t.completed).length;

  // Update browser tab title
  useEffect(() => {
    document.title = `(${pending}) pending - Task Dashboard`;
  }, [pending]);

  // useCallback: keeps same function reference between renders
  const addTask = useCallback((title, priority) => {
    const task = { id: Date.now(), title, priority, completed: false };
    setTasks((prev) => [task, ...prev]);
    setLatestAction(`Added task "${title}"`);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    setLatestAction(`Toggled task #${String(id).slice(-4)}`);
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setLatestAction(`Deleted task #${String(id).slice(-4)}`);
  }, [setTasks]);

  // useMemo: only re-filter when tasks or filters change
  const visibleTasks = useMemo(() => {
    return tasks.filter((t) => {
      const statusOk =
        statusFilter === "All" ||
        (statusFilter === "Completed" ? t.completed : !t.completed);
      const priorityOk = priorityFilter === "All" || t.priority === priorityFilter;
      return statusOk && priorityOk;
    });
  }, [tasks, statusFilter, priorityFilter]);

  return (
    <div className={"app " + theme}>
      <Header total={tasks.length} pending={pending} />
      <main>
        <MetricsSummary tasks={tasks} />
        <CardWrapper title="Add Task">
          <TaskForm onAdd={addTask} />
        </CardWrapper>
        <CardWrapper title="Tasks">
          <div className="filters">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setLatestAction(`Status filter: ${e.target.value}`);
              }}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setLatestAction(`Priority filter: ${e.target.value}`);
              }}
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
        </CardWrapper>
        <CardWrapper title="Activity Log">
          <ActivityLogger latestAction={latestAction} />
        </CardWrapper>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
