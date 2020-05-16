const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const fruitSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please check your data entry, no name found']
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema)

const apple = new Fruit({
  name: "Apple",
  rating: 9,
  review: "Good stuff"
})
//apple.save()
const banana = new Fruit({
  name: "Banana",
  rating: 10,
  review: "Best fruit ever"
})
const orange = new Fruit({
  name: "Orange",
  rating: 4,
  review: "Nice juice, bad fruit"
})
const kiwi = new Fruit({
  name: "Kiwi",
  rating: 2,
  review: "Too hary and expensive"
})
// Fruit.updateOne({
//   _id: "5ebf4e74e365899261fb6e8a"
// }, {
//   name: "Kiwiiiiii"
// }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Atualizado o campo com sucessso');
//   }
// })


// Fruit.deleteOne({
//   name: "Apple"
// }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Apple deleted with success!");
//   }
// })


// Fruit.insertMany([banana, orange, kiwi], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("documentos inseridos com sucesso");
//   }
// })


const personSchema = mongoose.Schema({
  name: String,
  age: Number,
  favouritFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema)

const person = new Person({
  name: 'Heitor',
  age: 19,
  favouritFruit: kiwi
}) //relacionando a collection people com a fruits


// person.save()

Person.updateOne({
  name: "Heitor"
}, {
  favouritFruit: banana
}, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Atualizado o campo com sucessso');
  }
})
// Person.deleteMany({
//   name: "Heitor"
// }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Deletado");
//   }
// })
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach(fruit => {
      mongoose.connection.close()
      console.log(fruit.name);
    });
  }
})