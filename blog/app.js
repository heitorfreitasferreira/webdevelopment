//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const port = 3000

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const postSchema = new Schema({
  title: {
    type: String,
    maxlength: 140,
    required: [true, "Faltou  do post"]
  },
  content: {
    type: String,
    required: [true, "Faltou corpo do post"]
  }
});


const Post = mongoose.model("Post", postSchema)

const defaultPost = [{
  title: 'Bem vindo ao meu blog',
  content: 'Clique no icone de "+" no menu do site para adicionar postagens'
}]


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


// GETS--- --- --- --- --- --- --- --- --- --- 

app.get("/", function (req, res) {
  Post.find({}, (err, foundPosts) => {
    // console.log(foundPosts);
    if (foundPosts.length === 0) {
      Post.insertMany(defaultPost, (error) => {
        if (error) {
          console.log("Erro ao inserir post default");
        } else {
          console.log(("Sucesso ao inserir post default"));
        }
      });
      res.redirect("/");
    } else {
      res.render("home", {
        arrayOfPosts: foundPosts
      })
    }
  })

})

app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent
  })
})

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent
  })
})

app.get("/compose", function (req, res) {
  res.render("compose")
})

app.get("/posts/:postId", function (req, res) {
  const postId = req.params.postId;
  // console.log(postId);
  Post.findById(postId, function (err, post) {
    if (!err) {
      // console.log(post);
      res.render("post", {
        titulo: post.title,
        corpo: post.content
      })
    } else {
      console.log("Erro:" + err + "\n Ao tentar achar o post, provavelmente não existe esse post");
    }
  })
  // var tituloRequerido = lodash.kebabCase(req.params.tituloDoPost);

  // arrayOfPosts.forEach((post) => {

  //   if (tituloRequerido === lodash.kebabCase(post.titulo)) {

  //   }

  // });
})
app.get("/not-found", function (req, res) {
  res.render("not-found")
})


// POSTS--- --- --- --- --- --- --- --- --- --- 

app.post("/compose", function (req, res) {
  const tituloPublicar = req.body.tituloPublicar
  const textoPublicar = req.body.textoPublicar
  // const poste = {
  //   titulo: req.body.tituloPublicar,
  //   corpo: req.body.textoPublicar,
  //   postDefault: false
  // }
  const post = new Post({
    title: tituloPublicar,
    content: textoPublicar
  })
  post.save((err) => {
    if (!err) {
      res.redirect("/")
    } else {
      console.log("Erro ao salvar o post");
    }
  })
})







app.listen(port, function () {
  console.log("Server started on port " + port);
});