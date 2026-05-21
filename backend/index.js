const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Project = require('./project');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// API route to get all projects from MySQL
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API route to create a project row
app.post('/api/projects', async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API route to delete a project row by its unique ID
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Project.destroy({ where: { id: id } });
        
        if (deleted) {
            return res.status(200).json({ message: "Project deleted successfully" });
        }
        return res.status(404).json({ error: "Project not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;

// ... leave all your routes up here completely untouched ...

sequelize.sync({ alter: true })
  .then(() => {
    console.log('MySQL Database & Tables Sync Complete!');

    // Move your server startup inside here so Render doesn't shut it down!
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running smoothly on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database synchronization failed:', err);
  });

