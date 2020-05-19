const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const _ = require("lodash")

const app = express();
const port = process.env.PORT

app.set('view engine', 'ejs');
//Funções
// function primeiraMaiuscula(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }

// function primeiraMinuscula(string) {
//   return string.charAt(0).toLowerCase() + string.slice(1)
// }


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://heitorfreitasf:11921bcc026@to-do-list-enkj8.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


// Mongoose Schemas e models=====================
const itemsSchema = {
  name: String
};
const Item = mongoose.model("Item", itemsSchema);
//=== === === ===
const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);
//===============================================


// const item1 = new Item()
// const item2 = new Item()
// const item3 = new Item()
const defaultItems = [{
  name: 'Estudar Mongoose'
}, {
  name: 'Adaptar a lista'
}, {
  name: 'Postar o #100DaysOfCode no Twitter'
}]



app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log("Item adicionado com sucesso no DB");
        }
      });
      res.redirect("/")
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      });
    }
  });
});



app.get("/:route", function (req, res) {
  const customListName = _.capitalize(req.params.route);
  List.findOne({
    name: customListName
  }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //Criar uma nova lista
        const list = new List({
          name: customListName,
          items: defaultItems
        })
        list.save()
        res.redirect("/" + customListName)
      } else {
        //Mostrar Lista existente
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  });
});



app.post("/", function (req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});




app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") { //atualizando a lista da /
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("/");
      }
    });

  } else { //
    List.findOneAndUpdate({
        name: listName
      }, {
        $pull: {
          items: {
            _id: checkedItemId
          }
        }
      },
      function (err, foundList) {
        if (!err) {
          res.redirect("/" + listName);
        }
      });
  }

})




app.listen(port, function () {
  console.log("Server started on port " + port || 3000);
});