const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config.json')('./env.json');
const jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
// default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/techticPractical';
mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser: true });

var users = require('./model/registermodel');
var userchats = require('./model/userchatmodel');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));

app.post('/register',async function(req,res){
  const resdata = await users.create(req.body);
  res.send(req.body);
});

app.post('/addmessage',async function(req,res){
  // let data = {
  //   userid : "6049e6264d54192dd09eabbc",
  //   username : "anand",
  //   messages : ["Hey there"]
  // };
  console.log("----------------",req.body);
  const resdata = await userchats.create(req.body);
  res.send(resdata);
});

// login user
app.get('/login',function(req,res){
  users.find({ $or:[ {'email':req.query.email}, {'username':req.query.email}] , password : req.query.password },function(err,result){
    if(result.length > 0){
      const token = jwt.sign({ sub: result[0]._id }, config.secret, { expiresIn: '1d' });
      res.send({data : result , token : token});
    }
    else{
      res.send({data : err , token : null});
    }
  });
});


app.get('/chat',async function(req,res){
  const resdata = await userchats.find({});
  console.log(resdata);
  res.json(resdata);
});
