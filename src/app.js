const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();

//banco na nuvem
mongoose.connect("mongodb+srv://sky:skydesafio@cluster0-tjvtu.mongodb.net/desafiosky?retryWrites=true&w=majority", {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true})

//conexão com o banco
let db = mongoose.connection;

//mensagem de erro, caso haja
db.on("error", console.log.bind(console, "connection error:"))

//mensagem de conexão
db.once("open", function(){
  console.log("Conexão feita com sucesso.")
})

//rotas
const usuarios = require("./routes/usuarioRoutes")

//acesso a api
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', usuarios)

module.exports = app