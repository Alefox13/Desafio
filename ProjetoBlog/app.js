const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser =  require("body-parser");
const app = express();
const admin = require("./routes/admin");
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const usuarios = require("./routes/usuarios")
const passport = require("passport")
require("./config/auth")(passport)
//Configurações
    //sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    //Midleware
    app.use((req, res, next) =>{
        res.locals.succes_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("erro_msg")
        res.locals.error = req.flash("error")
        next()
    })
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
        
    //MySQL
        //Em Breve
    // Public
        app.use(express.static(path.join(__dirname, "public")))  
        
        /*app.use((req, res, next) =>{
            console.log("Oi sou um middleware")
            next()

        }) */

//Rotas
    app.get('/', (req, res) =>{
        res.render('index')
    })

    app.get('/posts',(req, res) => {
        res.send("Lista de Posts")
    })

    app.use('/admin', admin)
    app.use("/usuarios", usuarios)
//Outros

const PORT = 8081;
app.listen(PORT,() =>{
    console.log("Servidor Rodando! ")
})