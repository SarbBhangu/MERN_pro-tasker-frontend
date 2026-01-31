import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createProject, getMyProjects } from "../api/projectApi";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createProject({ name, description });

      // Clear form
      setName("");
      setDescription("");

      // Refresh list
      await loadProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Create Project</h2>
      <form onSubmit={handleCreateProject}>
        <div>
          <label>Project Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          {loading ? "Working..." : "Create Project"}
        </button>
      </form>

      <hr />

      <h2>My Projects</h2>

      {loading && <p>Loading...</p>}

      {error && (
        <p>
          <strong>Error:</strong> {error}
        </p>
      )}

      {!loading && projects.length === 0 && <p>No projects yet.</p>}

      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <Link to={`/projects/${project._id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

