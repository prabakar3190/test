var fs = require('fs');
var bodyParser =  bodyParser = require('body-parser');
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);
console.log(words);


var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var server = app.listen(3000, listening);

function listening() {
  console.log("listening. . . ");
}

app.use(express.static('website'));

app.post('/addWord', addWord);

function addWord(request, response) {
  var data = request.body;
  var word = data.word;
  var score = Number(data.score);
  var reply;
  if (!score) {
    var reply = {
      msg: "Score is required."
    }
    response.send(reply);
  } else {
    words[word] = score;
    var data = JSON.stringify(words, null, 2);
    fs.writeFile('words.json', data, finished);

    function finished(err) {
      console.log('all set.');
      reply = {
        word: word,
        score: score,
        status: "success"
      }
      response.send(reply);
    }


  }

}

app.get('/all', sendAll);

function sendAll(request, response) {
  response.send(words);
}

app.get('/search/:word/', searchWord);

function searchWord(request, response) {
  var word = request.params.word;
  var reply;
  if (words[word]) {
    reply = {
      status: "found",
      word: word,
      score: words[word]
    }
  } else {
    reply = {
      status: "not found",
      word: word
    }
  }
  response.send(reply);
}

app.post('/analyze', analyzeThis);
function analyzeThis(request, response) {
  var reply = {
    hi: ok
  }
  response.send(reply);
}