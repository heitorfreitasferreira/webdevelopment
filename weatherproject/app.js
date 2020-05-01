const express     = require("express")
const https       = require("https")
const bodyParser  = require("body-parser")
const app         = express()
const translate   = require('translator-promise');
const port        = 3000

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html")

})
app.post("/",function(req,res){
  console.log("Post recebido");
  const apikey  = "fbfd1c9e24b0d9c38aeb0c70f985b5ce"
  var city      = req.body.cityName
  const url     = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units=metric"


  https.get(url,function(response){
    console.log(response.statusCode)

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp        = weatherData.main.temp
      const description = weatherData.weather[0].description
      //tentativa de traduzir inicio
      const result = translate('Hello world', 'ja');
      console.log(result);
      //tentativa de traduzir fim
      const icon        = weatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"

      res.write("<h1>A temperatura em "+city+" eh de "+temp+"graus C</h1>")
      res.write("<h2>E esta atualmente com "+description+"</h2>")
      res.write("<img src="+imageURL+">")
      res.send()
    })

  })
  //res.send("server is up and running")
})


app.listen(port, function(){
  console.log("Server rodando na porta " + port)
})
