const { response } = require('express');
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');

const app = express();
const path = require('path');
const db = require('./models')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then(apiResponse => {
    let pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  }) 
});


// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(process.env.PORT || 3000, () => console.log("server is working"));
