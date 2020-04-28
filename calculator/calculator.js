const express = require('express')
const app = express()

const port = 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => res.sendFile(__dirname+"/index.html"))


app.post("/",function(req,res){
  var num1 = Number(req.body.num1)
  var num2 = Number(req.body.num2)

  var soma = num1 + num2

    res.send("Resultado: "+soma)
});


app.get('/bmicalculator', (req, res) => res.sendFile(__dirname+"/bmiCalculator.html"))

app.post("/bmicalculator",function(req,res){
  var massa = req.body.massa
  var altura = req.body.altura

  var imc = massa / (altura*altura)
  
    res.send("Seu IMC é : "+Number((imc).toFixed(2)))
});

app.listen(port, () => console.log(`Server rodando em http://localhost:${port}`))
