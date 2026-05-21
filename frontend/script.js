const API_URL = 'https://my-portfolio-9n9a.onrender.com';

// 1. Fetch records and build modern card elements
async function fetchProjects() {
    try {
        const response = await fetch(API_URL);
        const projects = await response.json();
        
        const projectsContainer = document.getElementById('projects');
        if (!projectsContainer) return;
        
        projectsContainer.innerHTML = ''; 

        if (projects.length === 0) {
            projectsContainer.innerHTML = '<p class="empty-state">No recorded projects found. Populate the dashboard database below!</p>';
            return;
        }

        projects.forEach(project => {
            const techArray = Array.isArray(project.technologies) 
                ? project.technologies 
                : (project.technologies ? project.technologies.split(',') : []);

            const projectCard = document.createElement('div');
            // Advanced Card Styling matching our Indigo Theme
            projectCard.style = `
                background: #ffffff; 
                padding: 28px; 
                border-radius: 16px; 
                border: 1px solid #e2e8f0;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
                position: relative;
                display: flex;
                flex-direction: column;
            `;
            
            projectCard.innerHTML = `
                <button onclick="deleteProject(${project.id})" style="position: absolute; top: 24px; right: 24px; background: #fee2e2; color: #ef4444; border: none; border-radius: 8px; padding: 6px 12px; cursor: pointer; font-size: 0.8rem; font-weight: 600; font-family: inherit; transition: background 0.2s;">✕ Delete</button>
                
                <h3 style="margin: 0 0 10px 0; color: #0f172a; font-size: 1.3rem; font-weight: 700; padding-right: 90px; letter-spacing: -0.02em;">${project.title}</h3>
                <p style="color: #475569; font-size: 0.95rem; line-height: 1.6; margin: 0 0 20px 0;">${project.description}</p>
                
                <div style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 6px;">
                    ${techArray.map(tech => `<span style="background: #f1f5f9; padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; color: #334155; font-weight: 600; letter-spacing: 0.02em;">${tech.trim()}</span>`).join('')}
                </div>
                
                <div style="margin-top: auto; display: flex; gap: 20px; font-size: 0.9rem; border-top: 1px solid #f1f5f9; padding-top: 16px;">
                    <a href="${project.liveLink || '#'}" target="_blank" style="color: #10b981; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">Live Demo ↗</a>
                    <a href="${project.githubLink || '#'}" target="_blank" style="color: #4f46e5; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">GitHub Code ↗</a>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error connecting to backend API:', error);
        document.getElementById('projects').innerHTML = '<p class="empty-state" style="color: #ef4444; border-color: #fca5a5;">Unable to reach backend database server. Verify node context pipeline.</p>';
    }
}

// 2. Add Project handler 
async function addProject() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const techInput = document.getElementById('tech').value;
    const githubLink = document.getElementById('github').value;
    const liveLink = document.getElementById('live').value;

    if (!title || !description || !techInput) {
        alert('Please fill out the Title, Description, and Tech Stack input blocks.');
        return;
    }

    const technologies = techInput.split(',').map(t => t.trim());
    const newProject = { title, description, technologies, githubLink, liveLink };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject)
        });

        if (response.ok) {
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
            document.getElementById('tech').value = '';
            document.getElementById('github').value = '';
            document.getElementById('live').value = '';
            fetchProjects();
        }
    } catch (error) {
        console.error('Error processing insertion:', error);
    }
}

// 3. Delete row project function
async function deleteProject(id) {
    if (!confirm("Are you certain you want to purge this portfolio project record?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchProjects();
        }
    } catch (error) {
        console.error('Error sending deletion query:', error);
    }
}

window.onload = fetchProjects;
