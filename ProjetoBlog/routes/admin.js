const express = require("express")
const router = express.Router()
const Categoria = require('../models/Categoria');
const multer = require('multer');
const upload = multer({dest:'upload/'});
const Usuário = require('../models/Usuário');

router.get('/',(req, res) =>{
    res.render("admin/index")
})

router.get('/posts', (req,res) =>{
    res.send("Pagina de posts")
})

router.get("/categorias",(req, res) => {
    Categoria.findAll({order: [['id', 'DESC']]}).then(function(categorias){
        res.render("admin/categorias", {categorias: categorias})
        
        var voted_on = [];

                if(u.length == 1){
                    voted_on = u[0].votes;}
    })
    
})

router.get("/categorias/add", (req, res) =>{
    res.render("admin/addCategorias")
})

router.post("/categorias/nova", upload.single('file'), (req, res) =>{
    Categoria.create({
        nome: req.body.nome,
        fileName:req.file.originalname,
        fileExt:req.file.mimetype,
        file:fileContent
    }).then(()=> {
        res.redirect('/admin/categorias')
    }).catch(() =>{
        console.log("erro ao salvar")
    })
})

router.get("/categorias/edit/:id",(req,res) =>{
    Categoria.findOne({_id:req.params.id}).then((categoria)=>{
        res.render("admin/editcategoria", {categoria: categoria})
    }).catch((err)=> {
        req.flash("erro_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
    
})

router.get('/categorias/deletar/:id', function(req, res){
    Categoria.destroy({where: {'id': req.body.id}}).then(function(){
        req.flash("success_msg", "Postagem Deletada");
        res.redirect("/admin/categorias")
    }).catch(function(erro){
        res.flash("error_msg", "Esta postagem não existe")
    });
});

module.exports = router