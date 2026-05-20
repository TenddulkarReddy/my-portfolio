import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState([]);

  // Automatically seeds a fallback project if your database table is blank
  const insertSampleProject = () => {
    const sampleData = {
      title: "My Full-Stack Portfolio",
      description: "A sleek personal web app built with React, Node.js, and MySQL to showcase my assignments.",
      technologies: ["React", "NodeJS", "MySQL", "Express"],
      liveLink: "https://example.com",
      githubLink: "https://github.com"
    };

    axios.post('http://localhost:5000/api/projects', sampleData)
      .then(res => setProjects([res.data]))
      .catch(err => console.error("Database seed failed:", err));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        if (response.data.length === 0) {
          insertSampleProject();
        } else {
          setProjects(response.data);
        }
      })
      .catch(error => console.error("Error fetching database projects:", error));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px', background: '#f4f7f6', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#333' }}>My Personal Portfolio</h1>
        <p style={{ color: '#666' }}>A Full-Stack Project using React, Node.js, and MySQL</p>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {projects.map(project => (
            <div key={project.id} style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <h3 style={{ marginTop: '0', color: '#007bff' }}>{project.title}</h3>
              <p style={{ color: '#555' }}>{project.description}</p>
              <div style={{ margin: '15px 0' }}>
                {project.technologies.map((tech, i) => (
                  <span key={i} style={{ background: '#e9ecef', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', marginRight: '5px', color: '#495057' }}>
                    {tech}
                  </span>
                ))}
              </div>
              <div>
                <a href={project.liveLink} target="_blank" rel="noreferrer" style={{ marginRight: '15px', color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>Live Demo</a>
                <a href={project.githubLink} target="_blank" rel="noreferrer" style={{ color: '#333', textDecoration: 'none', fontWeight: 'bold' }}>GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;