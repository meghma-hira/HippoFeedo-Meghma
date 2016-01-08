/**
 * Created by abhinav on 3/12/15.
 */
var express = require("express");
var app = express();
var ejs = require("ejs");

var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({secret: '1234567890QWERTY'}));
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(express.static(__dirname + "/public", {maxAge: 3456700000}));
router = require("./routes/main")(app);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);


var server = app.listen(3000, function(err){
    if(err)
        console.log("Error in Server");

    console.log("Server listening to port" + server.address().port);
});