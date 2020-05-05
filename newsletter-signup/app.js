const express       = require("express")
const bodyParser    = require("body-parser")
const request       = require('request');
const https         = require("https")
const porta         = process.env.PORT
const app           = express()
const apikey        ="413297ecbbeac61b780210b5bf6c3b82-us8"
const listId        ="aea789ed95"

app.use(express.static("public"))
//faz que a raiz dos arquivos publicos seja o diretorio 'public'
app.use(bodyParser.urlencoded({extended:true}))
//habilita poder usar os id's dos inputs como variáveis para puxar do form
app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html")//puxa o arquivo html signup

})
app.post("/",function(req,res){
  const firstName     = req.body.inputName     //pega o campo nome do form
  const lastName = req.body.inputLastName //pega o campo sobrenome do form
  const email    = req.body.inputEmail //pega o campo email do form


  const data = {
    members:
    [
      {
        email_address:email,
        status:"subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/"+listId

  const options = {
    method: "POST",
    auth: "heitorteste:"+apikey
  }


  const request = https.request(url,options, function(response){
    response.on("data",function(data){//o que o mailchimp disse sobre a tentativa de post do meu site
      if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html")      }
      else{
        res.sendFile(__dirname+"/failure.html")
      }
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData)
  request.end()


})
app.post("/failure",function(req,res){
  res.redirect("/")
})



app.listen(porta || 3000,function(){
  console.log("Server rodando na porta " + porta);
})





// const data = {
//   members: [{
//     email_address: email,
//     status: "subscribed",
//     merge_fields: {
//       FNAME: firstName,
//       LNAME: lastName
//     }
//   }]
// };//OBJ A SER ENVIADO PARA O MAILCHIMP
//
// const jsonData = JSON.stringify(data)//TRANSFORMA O OBJ EM JSON
// const url = "https://us8.api.mailchimp.com/3.0/list/"+listId//ENDPOINT DO SERVIDOR DO MAILCHIMP + O ID DA LISTA DE EMAILS QUE EU VOU ADICIONAR O USUÁRIO
// const options =
// {
//   method: "POST",
//   auth: "heitor1:c71f1ba9220551708aaf74eade9fb499-us8"
// }
// const request = https.request(url, options, function(response){
//   response.on("data",function(data){
//     console.log(JSON.parse(data))
//   })
//
// })
// request.write(jsonData)
// request.end;
