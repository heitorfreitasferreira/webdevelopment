//jshint esversion:6
// require('dotenv').config() //tem que ficar na primeira linha
const express = require('express')
const _ = require('lodash')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
// const encrypt = require("mongoose-encryption") //encripta ao chamar o metodo save() do mongoose e desencrypta ao chamar o metodo find()
// const md5 = require('md5') //hash md5 (rapido de ser quebrado)
// const bcrypt = require('bcrypt')
// const saltRounds = 10
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const port = 3001

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')
app.use(session({
  secret: 'omeusegredoeheze',
  resave: false,
  saveUninitialized: false
})) //tem que ficar aqui dps dos app.use e antes de conectar do db

app.use(passport.initialize()) //deixa usar para autentificar
app.use(passport.session()) //dizendo que é pra usar o passport pra lidar com as sessions


mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema
// console.log(process.env.SECRET);
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
userSchemma.plugin(passportLocalMongoose)
// userSchemma.plugin(encrypt, {
//   secret: process.env.SECRET,
//   encryptedFields: ['password'], //Faz com que somente o campo password seja encriptado
//   excludeFromEncryption: ['email'] //Faz com que somente o campo email NÃO seja encriptado
// }) //isso tem que ser feito antes de criar o mongoose.model
const User = new mongoose.model('User', userSchemma)

passport.serializeUser(User.serializeUser()) //cria o cookie
passport.deserializeUser(User.deserializeUser()) //usa o cookie

// console.log(md5("Quero transa inferno de virus"));
app.get('/', (req, res) => {
  res.render('home')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/register', (req, res) => {
  res.render('register')
})
app.get('/secrets', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('secrets')
  } else {
    res.redirect('/login')
  }
})
// app.post('/register', (req, res) => {

//   const email = req.body.username

//   bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
//     const newUser = new User({
//       email: email,
//       password: hash
//     })
//     newUser.save((err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.render("secrets")
//       }
//     })
//   })

// })

// app.post('/login', (req, res) => {
//   const email = req.body.username

//   User.findOne({
//     email: email
//   }, (err, foundUser) => {
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
//         bcrypt.compare(req.body.password, saltRounds, (error, result) => {
//           if (result === true) {
//             res.render("secrets")
//           } else {
//             console.log("Wrong password");
//           }
//         })
//       } else {
//         res.render('register')
//       }
//     }
//   })
// })

app.post('/login', (req, res) => {

})
app.post('/register', (req, res) => {
  User.register({
    username: req.body.username
  }, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect('/register')
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect('/secrets')
      })
    }
  })
})



app.listen(port, () => {
  console.log("Server up and running on port " + port);
})