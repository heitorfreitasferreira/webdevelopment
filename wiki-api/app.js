const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const port = 3000

const app = express()

app.set('view engine', 'ejs'); //configurando a view engine para usar o EJS
app.use(bodyParser.urlencoded({
  extended: true
})); //Usar body parser para passar os requests
app.use(express.static("public")); //indicando onde estarão os arquivos statics, como imgs e css file
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}) //conectando a database "wikiDB"
const Schema = mongoose.Schema //poder usar o construtor de Schema do Mongoose


const articleSchema = new Schema({
  title: String,
  content: String
})

const Article = mongoose.model("Article", articleSchema)
const Gitdoc = mongoose.model("Gitdoc", articleSchema)


//app.route("/:route").get().post().delete()


app.get("/:route", (req, res) => {
  const route = req.params.route
  // console.log(route);
  if (route === "articles") {
    Article.find({}, (err, foundArticles) => {
      if (!err) {
        res.send(foundArticles)
      } else {
        res.send(err)
      }
    })
  }
  if (route === "git") {
    Gitdoc.find({}, (err, foundArticles) => {
      if (!err) {
        res.send(foundArticles)
      } else {
        res.send(err)
      }
    })
  }
});
app.post("/:route", (req, res) => {
  const route = req.params.route
  console.log(req.body.title)
  console.log(req.body.content)
  // console.log(route);
  if (route === "articles") {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save((err) => {
      if (!err) {
        res.send("Artigo adicionado com sucesso")
      } else {
        res.send(err)
      }
    })
  }
  if (route === "git") {
    const newGitdoc = new Gitdoc({
      title: req.body.title,
      content: req.body.content
    });
    newGitdoc.save((err) => {
      if (!err) {
        res.send("Documentação sobre Git adicionada com sucesso")
      } else {
        res.send(err)
      }
    })
  }
});

app.delete("/:route", (req, res) => {
  const route = req.params.route
  // console.log(req.body.title)
  // console.log(req.body.content)
  // console.log(route);
  if (route === "articles") {
    // const newArticle = new Article({
    //   title: req.body.title,
    //   content: req.body.content
    // });
    // newArticle.save((err) => {
    //   if (!err) {
    //     res.send("Artigo adicionado com sucesso")
    //   } else {
    //     res.send(err)
    //   }
    // })
    Article.deleteMany({}, (err) => {
      if (!err) {
        res.send("Artigos deletados com sucesso")
      } else {
        res.send(err)
      }
    })
  }
  if (route === "git") {
    // const newGitdoc = new Gitdoc({
    //   title: req.body.title,
    //   content: req.body.content
    // });
    // newGitdoc.save((err) => {
    //   if (!err) {
    //     res.send("Documentação sobre Git adicionada com sucesso")
    //   } else {
    //     res.send(err)
    //   }
    // })
  }
});
app.listen(port, function () {
  console.log("Servidor rodando na porta " + port);
})