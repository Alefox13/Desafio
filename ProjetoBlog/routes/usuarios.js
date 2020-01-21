const express = require("express")
const router = express.Router()
const Usuário = require('../models/Usuário');
const bcrypt = require("bcryptjs")

router.get("/registro",(req,res) =>{
    res.render("usuarios/registro")
    
})

router.post("/registro", (req,res) =>{
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome invalido"})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "E-mail inválido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"})
    }

    if(req.body.senha.length <4 ){
        erros.push({texto: "Senha muito curta"})
    }
    
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "As Senhas são diferentes, tente novamente!"})
    }

    if(erros.length > 0){
        
        res.render("usuarios/registro", {erros: erros})

    }else{

        Usuário.findOne({email: req.body.email}).then((usuario) =>{
            if(usuario){
                req.flash("error_msg", "Ja existe uma conta com este email")
                res.redirect("/usuarios/registro")

            }else{

                const novoUsuario = new Usuário({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })

                bcryot.genSalt(10, (erro, salt) =>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) =>{
                        if(erro){
                            req.flash("erro_msg, houve um erro durante o salvamento")
                        }

                        novoUsuario.senha = hash 

                        novoUsuario.create().then(() =>{
                            req.flash("sucess_msg", "Usuario criado com sucesso")
                            res.redirect("/")
                        }).cath((err) => {
                            req.flash("error_msg", "Houve um erro ao criar o usuário, tente novamento!")
                            res.redirect("/usuarios/registro")
                        })
                    })
                })

            }
        }).catch((err) =>{
            req.flash("erro_msg", "Houve um erro interno")
            res.redirect("/")
        })

    }



})

router.get("/login",(req, res) =>{
    res.render("usuarios/login")
})

router.post("/login", (req, res, next) =>{

    passport.authenticate("local",{
        sucessRedirect: "/",
        failureRedirect: "/usuario/login",
        failureFlash: true
    })(req,res,next)
})

module.exports = router