const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// If Render's single connection string is available, use it directly!
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Fallback structure for your local computer setup
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false
    }
  );
}

module.exports = sequelize;
