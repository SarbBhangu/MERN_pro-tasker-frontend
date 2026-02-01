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

      setName("");
      setDescription("");

      await loadProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h1>Dashboard</h1>
        <p>Create projects and manage tasks inside each project.</p>
      </div>

      <div className="spacer" />

      <div className="card">
        <h2>Create Project</h2>

        <form className="form" onSubmit={handleCreateProject}>
          <div>
            <div className="label">Project Name</div>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            {loading ? "Working..." : "Create Project"}
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
        <h2>My Projects</h2>

        {loading && <p>Loading...</p>}

        {!loading && projects.length === 0 && <p>No projects yet.</p>}

        <ul className="list">
          {projects.map((project) => (
            <li key={project._id} className="card">
              <div className="list-item">
                <div>
                  <strong>{project.name}</strong>
                  {project.description ? (
                    <p style={{ margin: "6px 0 0 0" }}>{project.description}</p>
                  ) : (
                    <p style={{ margin: "6px 0 0 0" }}>No description</p>
                  )}
                </div>

                <Link className="btn btn-secondary" to={`/projects/${project._id}`}>
                  Open
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


