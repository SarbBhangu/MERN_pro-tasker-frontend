import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createTask, deleteTask, getTasks, updateTask } from "../api/taskApi";

function getBadgeClass(status) {
  if (status === "Done") return "badge done";
  if (status === "In Progress") return "badge progress";
  return "badge todo";
}

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
      <div className="card">
        <Link to="/dashboard">← Back to Dashboard</Link>
        <h1>Project</h1>
        <p className="small">
          <strong>Project ID:</strong> {projectId}
        </p>
      </div>

      <div className="spacer" />

      <div className="card">
        <h2>Create Task</h2>

        <form className="form" onSubmit={handleCreateTask}>
          <div>
            <div className="label">Title</div>
            <input
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="label">Description</div>
            <input
              className="input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Working..." : "Create Task"}
          </button>
        </form>

        {error && (
          <p className="error">
            <strong>Error:</strong> {error}
          </p>
        )}
      </div>

      <div className="spacer" />

      <div className="card">
        <h2>Tasks</h2>

        {loading && <p>Loading...</p>}

        {!loading && tasks.length === 0 && <p>No tasks yet.</p>}

        <ul className="list">
          {tasks.map((task) => (
            <li key={task._id} className="card">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <strong>{task.title}</strong>
                    <span className={getBadgeClass(task.status)}>{task.status}</span>
                  </div>

                  {task.description ? (
                    <p style={{ margin: "6px 0 0 0" }}>{task.description}</p>
                  ) : (
                    <p style={{ margin: "6px 0 0 0" }}>No description</p>
                  )}
                </div>
              </div>

              <div className="spacer" />

              <div className="row">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleStatusChange(task._id, "To Do")}
                  disabled={loading}
                >
                  To Do
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleStatusChange(task._id, "In Progress")}
                  disabled={loading}
                >
                  In Progress
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleStatusChange(task._id, "Done")}
                  disabled={loading}
                >
                  Done
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
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
    </div>
  );
}

