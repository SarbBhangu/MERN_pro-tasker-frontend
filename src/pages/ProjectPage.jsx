import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createTask, deleteTask, getTasks, updateTask } from "../api/taskApi";

export default function ProjectPage() {
  const { id: projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks(projectId);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createTask(projectId, { title, description });

      setTitle("");
      setDescription("");

      await loadTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setLoading(true);
      setError("");

      await updateTask(projectId, taskId, { status: newStatus });
      await loadTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true);
      setError("");

      await deleteTask(projectId, taskId);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link to="/dashboard">← Back to Dashboard</Link>

      <h1>Project Tasks</h1>
      <p>
        <strong>Project ID:</strong> {projectId}
      </p>

      <h2>Create Task</h2>
      <form onSubmit={handleCreateTask}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <br />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Working..." : "Create Task"}
        </button>
      </form>

      <hr />

      <h2>Tasks</h2>

      {loading && <p>Loading...</p>}

      {error && (
        <p>
          <strong>Error:</strong> {error}
        </p>
      )}

      {!loading && tasks.length === 0 && <p>No tasks yet.</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: "12px" }}>
            <div>
              <strong>{task.title}</strong> — {task.status}
            </div>
            {task.description && <div>{task.description}</div>}

            <div style={{ marginTop: "6px", display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => handleStatusChange(task._id, "To Do")}
                disabled={loading}
              >
                To Do
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(task._id, "In Progress")}
                disabled={loading}
              >
                In Progress
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(task._id, "Done")}
                disabled={loading}
              >
                Done
              </button>

              <button
                type="button"
                onClick={() => handleDeleteTask(task._id)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
