const express = require("express");
const path = require("path");
var exphbs  = require('express-handlebars');
const logger = require('./middleware/logger')
const members = require('./members')
const app = express();

//app.use(logger)

//handlebar middleware 
 
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
 
// body parser middleware  
app.use(express.json())
app.use(express.urlencoded({ extended :false}))


//homepage route // render  
app.get('/',(req,res)=>res.render('index',{
    title:'Member App',
    members
}))


//set static folder
app.use(express.static(path.join(__dirname, "public")));


//member api routes 
app.use('/api/members',require('./route/members'))

const PORT = process.env.PORT || 5000; // port number

app.listen(PORT, () => console.log(`server running on part ${PORT}`));
  
