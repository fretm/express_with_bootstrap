const express = require("express");
const path = require("path");
var exphbs  = require('express-handlebars');
const logger = require('./middleware/logger')
const app = express();

//app.use(logger)

//handlebar middleware 
 
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
 
// body parser middleware  
app.use(express.json())
app.use(express.urlencoded({ extended :false}))


//home page route 
app.get('/',(req,res)=>res.render('index'))

//set static folder
app.use(express.static(path.join(__dirname, "public")));


//member api routes 
app.use('/api/members',require('./route/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on part ${PORT}`));
  