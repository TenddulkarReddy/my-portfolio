const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  technologies: {
    type: DataTypes.STRING,
    allowNull: false,
    // Converts arrays to flat text inside MySQL, and reverses it when sending data out
    get() {
      const value = this.getDataValue('technologies');
      return value ? value.split(',') : [];
    },
    set(val) {
      if (Array.isArray(val)) {
        this.setDataValue('technologies', val.join(','));
      } else {
        this.setDataValue('technologies', val);
      }
    }
  },
  liveLink: {
    type: DataTypes.STRING
  },
  githubLink: {
    type: DataTypes.STRING
  }
});

module.exports = Project;