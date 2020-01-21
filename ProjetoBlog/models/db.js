const Sequelize = require('sequelize');
//Conexão com o banco de dados MySQL
const sequelize = new Sequelize('blogapp','root', 'al1306',{
    host: "localhost",
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}