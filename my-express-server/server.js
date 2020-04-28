const express = require('express')
const app = express()

app.listen(3000,function(){
  console.log("Servidor rodando na porta 3000")
});

app.get("/",function(req,res){
  res.send("<h1>Hello World!</h1>")
});

app.get("/contact",function(req,res){
  res.send("email : heitor.ff@hotmail.com")

});


app.get("/about",function(req,res){
  res.send("<h1>Nome : Heitor Freitas</h1><p>Estou aprendendo Node.js </p>")

});
