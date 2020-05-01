const express       = require("express")
const bodyParser    = require("body-parser")
const request       = require('request');
const porta         = 3000
const app           = express()


app.use(express.static("public"))
//faz que a raiz dos arquivos publicos seja o diretorio 'public'
app.use(bodyParser.urlencoded({extended:true}))
//habilita poder usar os id's dos inputs como variáveis para puxar do form
app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html")//puxa o arquivo html signup

})
app.post("/",function(req,res){
  var firstName     = req.body.inputName     //pega o campo nome do form
  var lastName = req.body.inputLastName //pega o campo sobrenome do form
  var email    = req.body.inputEmail //pega o campo email do form
  console.log(firstName+" "+lastName+"\n"+email);
  //res.send("<h1>"+firstName+" "+lastName+"\n"+email+"</h1>")
})




app.listen(porta,function(){
  console.log("Server rodando na porta " + porta);
})
