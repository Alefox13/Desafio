const localStrategy = require("passport-local").Strategy
const db = require('../models/db')
const bcrypt = require("bcryptjs")

//Model de usuário
const Usuário = require('../models/Usuário')

module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email,senha,done) =>{

        Usuário.findOne({email: email}).then((usuario) =>{
            if(usuario){
                return done(null, false, {message: "Esta conta não existe"})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem)=> {

                if(batem){
                    return done(null,usuario)
                }else{
                    return done(null, false, {message: "Senha Incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((usuario, done) =>{

        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) =>{
        Usuiário.findById(id, (err, usuario) =>{
            done(err, usuario)
        })
    })


}