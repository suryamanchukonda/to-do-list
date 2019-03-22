//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js")

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

let items = [];
let workItems = [];

app.get("/", function(req, res) {

  let day = date.getDay();

  res.render("list", {
    listTitle: day,
    newListItem: items
  });
})

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if(req.body.list === "work"){
    workItems.push(item);
    res.redirect("/work")
  }else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list", {
    listTitle: "Work List",
    newListItem: workItems
  })
})

app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", function(req, res){
  res.render("about.ejs");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
