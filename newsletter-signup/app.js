const express       = require("express")
const bodyParser    = require("body-parser")
const porta         = 3000

const app = express()







app.listen(porta,function(){
  console.log("Server rodando na porta "+porta);
})
