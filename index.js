const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./assets'));

app.use(expressEjsLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// Connect Routes
app.use('/', require('./routes'));

// Start the server
app.listen(port, function(err){
  if(err){
      console.log(`Error in running the server: ${err}`);
      return;
  }
  console.log(`The server is running on the port: ${port}`);
})

