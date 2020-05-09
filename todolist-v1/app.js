//jshint esversion:6
const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")
const porta = 3000
const app = express()


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"))
app.set('view engine', 'ejs');


var arrayOfItens = []
app.get("/", function (req, res) {
  var todayHumanFormated = date.getDate()

  todayHumanFormated = todayHumanFormated[0].toUpperCase() + todayHumanFormated.slice(1);
  res.render("list", {
    todayHumanFormated: todayHumanFormated,
    arrayOfItens: arrayOfItens
  }) //express olha no diretorio views por um arquivo chamado list, procura por uma tag q tenha o nome kindOfDay e passa o valor da var day pra ela
})

app.post("/", function (req, res) {
  var newIten = req.body.addIten;
  arrayOfItens.push(newIten);
  res.redirect("/")
})

app.listen(porta, function () {
  console.log("Server is up and running on port: " + porta);
})