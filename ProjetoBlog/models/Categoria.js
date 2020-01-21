const db = require('./db');

const Categoria = db.sequelize.define('categorias',{
    nome: {
     type: db.Sequelize.STRING
 },
 fileName: {
    type: db.Sequelize.STRING,
    
  },

  fileExt: {
    type: db.Sequelize.STRING,
    
    
  },
  
  file: {type: db.Sequelize.TEXT, allowNull: true},

    date: {
    type: db.Sequelize.DATE
}
    
});

photos_on_disk.forEach(function(photo){
    photos.insert({
        name: photo,
        likes: 0,
        dislikes: 0
    });
});
//Categoria.sync({force: true})

module.exports = Categoria;