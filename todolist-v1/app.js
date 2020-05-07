//jshint esversion:6
const express = require("express")
const bodyParser = require("body-parser")
const porta = 3000
const app = express()

app.get("/",function(req,res){
  var today = new Date();
  if (today.getDate()===6 || today.getDate()===0){
    res.send("YEAH Weekend!")
  }else{
    res.send("NOOO Weekday :(")
  }

})

app.listen(porta,function(){
  console.log("Server is up and running on port: "+porta);
})
