//jshint esversion:6
const express = require('express')
const _ = require('lodash')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const encrypt = require("mongoose-encryption") //encripta ao chamar o metodo save() do mongoose e desencrypta ao chamar o metodo find()

const port = 3000

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')


mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const Schema = mongoose.Schema

const userSchemma = new Schema({
  email: {
    type: String,
    required: [true, 'Insira o email']
  },
  password: {
    type: String,
    required: [true, 'Insira a senha']
  }
})
const secret = '3sseehosecredodomeusite!'
userSchemma.plugin(encrypt, {
  secret: secret,
  encryptedFields: ['password'], //Faz com que somente o campo password seja encriptado
  excludeFromEncryption: ['email'] //Faz com que somente o campo email NÃO seja encriptado
}) //isso tem que ser feito antes de criar o mongoose.model
const User = new mongoose.model('User', userSchemma)


app.get('/', (req, res) => {
  res.render('home')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  const email = req.body.username
  const password = req.body.password
  const newUser = new User({
    email: email,
    password: password
  })
  newUser.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets")
    }
  })
})

app.post('/login', (req, res) => {
  const email = req.body.username
  const password = req.body.password
  User.findOne({
    email: email
  }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets")
        } else {
          console.log("Wrong password");
        }
      } else {
        res.render('register')
      }
    }
  })
})






app.listen(port, () => {
  console.log("Server up and running on port " + port);
})