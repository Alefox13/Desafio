const db = require('./db');

const Usuário = db.sequelize.define('usuarios',{
    nome: {
     type: db.Sequelize.STRING
 },
    email: {
     type: db.Sequelize.STRING
 },
    senha: {
    type: db.Sequelize.STRING
}
    
});

//Usuário.sync({force: true})

module.exports = Usuário;