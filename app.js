var express = require("express");

var app 	= express();

var routes 	= require("./routes");
var posts 	= require("./routes/post");
var http 	= require("http");
var path 	= require("path");
var bodyParser = require("body-parser");
var db		= require("./models");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '/public')));

app.get("/", routes.index);
app.get("/posts", posts.findAll);
app.get("/posts/:id", posts.findOne);
app.post("/posts", posts.create);
app.put("/posts/:id", posts.update);
app.delete("/posts/:id", posts.destroy);

var server = app.listen(3000, function() {
	console.log("Listening on port %d", server.address().port);
});

db
  .sequelize
  .sync();