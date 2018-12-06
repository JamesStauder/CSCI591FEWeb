var express = require("express");
var app     = express();
var path    = require("path");



app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/inputLesson.html'));
});

app.get('/input',function(req,res){
  res.sendFile(path.join(__dirname+'/inputLesson.html'));
});

app.get('/game1',function(req,res){
  res.sendFile(path.join(__dirname+'/game1/pythonTyper.html'));
});

app.get('/game2',function(req,res){
  res.sendFile(path.join(__dirname+'/game2/pythonTyper.html'));
});

app.listen(8000);

console.log("Running at Port 8000");