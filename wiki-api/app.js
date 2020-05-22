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

///////////////////////////////////////////////////
app.route("/:route")
  .get((req, res) => {
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
  })
  .post((req, res) => {
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
  })
  .delete((req, res) => {
    const route = req.params.route
    // console.log(req.body.title)
    // console.log(req.body.content)
    // console.log(route);
    if (route === "articles") {
      Article.deleteMany({}, (err) => {
        if (!err) {
          res.send("Artigos deletados com sucesso")
        } else {
          res.send(err)
        }
      })
    } else if (collection === "git") {
      Gitdoc.deleteMany({}, (err) => {
        if (!err) {
          res.send("Artigos deletados com sucesso")
        } else {
          res.send(err)
        }
      })
    }
  })

/////////////////////////////////////////////////////
app.route('/:collection/:documentTitle')
  .get((req, res) => {
    const collection = req.params.collection
    const documentTitle = req.params.documentTitle
    if (collection === "articles") {
      Article.findOne({
        title: documentTitle
      }, (err, foundArticle) => {
        if (foundArticle) {
          res.send(foundArticle)
        } else {
          res.send("Não há artigos com esse titulo")
        }
      })
    } else if (collection === "git") {
      Gitdoc.findOne({
        title: documentTitle
      }, (err, foundArticle) => {
        if (foundArticle) {
          res.send(foundArticle)
        } else {
          res.send("Não há nada na documentação de git com esse titulo")
        }
      })
    }
  })
  .put((req, res) => {
    const collection = req.params.collection
    const documentTitle = req.params.documentTitle
    if (collection === "articles") {
      Article.replaceOne({
        title: req.params.documentTitle
      }, {
        title: req.body.title,
        content: req.body.content
      }, {
        overwrite: true
      }, function (err) {
        if (!err) {
          res.send(req.params.documentTitle + " atualizado com sucesso")
        } else {
          res.send(err)
        }
      });
    } else if (collection === "git") {
      Gitdoc.replaceOne({
        title: req.params.documentTitle
      }, {
        title: req.body.title,
        content: req.body.content
      }, {
        overwrite: true
      }, function (err) {
        if (!err) {
          res.send(req.params.documentTitle + " atualizado com sucesso")
        } else {
          res.send(err)
        }
      });
    }
    // else if (collection === "git") {

    // }
  })
  .patch((req, res) => {
    const collection = req.params.collection
    const documentTitle = req.params.documentTitle
    const bodyTitle = req.body.title
    const bodyContent = req.body.content
    if (collection === "articles") {
      Article.update({
        title: documentTitle
      }, {
        $set: req.body
      }, (err) => {
        if (!err) {
          res.send("PATCH em " + collection + " feito com sucesso");
        } else {
          res.send(err)
        }
      })
    } else if (collection === "git") {
      Gitdoc.update({
        title: documentTitle
      }, {
        $set: req.body
      }, (err) => {
        if (!err) {
          res.send("PATCH em " + collection + " feito com sucesso");
        } else {
          res.send(err)
        }
      })
    }
  })
  .delete((req, res) => {
    const collection = req.params.collection
    const documentTitle = req.params.documentTitle
    const bodyTitle = req.body.title
    const bodyContent = req.body.content
    if (collection === "articles") {
      Article.deleteOne({
        title: documentTitle
      }, (err) => {
        if (!err) {
          res.send(documentTitle + " deletado com sucesso")
        } else {
          res.send(err)
        }
      })
    } else if (collection === "git") {
      Git.deleteOne({
        title: documentTitle
      }, (err) => {
        if (!err) {
          res.send(documentTitle + " deletado com sucesso")
        } else {
          res.send(err)
        }
      })
    }
  })
// app.get("/:route", );
// app.post("/:route", );
// app.delete("/:route", );
app.listen(port, function () {
  console.log("Servidor rodando na porta " + port);
})