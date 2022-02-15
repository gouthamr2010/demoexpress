const Sequelize = require("sequelize");

const sequelize = new Sequelize("demo", null, null, {
  host: "localhost",
  dialect: "postgres"
});

module.exports = sequelize;