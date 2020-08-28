var express = require('express');
var app = express();

const recetas = [];

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/recipe/:recipekey/like/:review', function (req, res) {
  var foundRecipe = recetas.find(function (receta) {
    return receta.id == req.params.recipekey
  });

  foundRecipe.likes = (foundRecipe.likes + parseInt(req.params.review)) / 2
});


app.get('/recipe/:recipekey', function (req, res) {
  var foundRecipe = recetas.find(function (receta) {
    return receta.id == req.params.recipekey
  })
  if (foundRecipe == undefined) {
    const newRecipe = { id: req.params.recipekey, likes: 5 }
    recetas.push(newRecipe);
    return res.json(newRecipe);

  }
  return res.json(foundRecipe);
});

app.get('/read', function (req, res) {
  res.send(recetas);
});

app.listen(4000, function () {
  console.log('Aplicacion de ejemplo, escuchando el puerto 4000!');
});