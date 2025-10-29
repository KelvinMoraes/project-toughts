const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts", "root", "abc123", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectamos com sucesso! -> DB");
} catch (error) {
  console.log(`Não foi possível conectar: ${error}`);
}

module.exports = sequelize;
