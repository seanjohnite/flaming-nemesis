var http = require('http');
var fs = require('fs');

var nounList = ['person', 'human', 'frog']
var adjList = ['stupid', 'average', 'competent', 'intelligent']

var url = process.argv[2];

function logList(word, partOfSpeech) {
  var url = 'http://words.bighugelabs.com/api/2/777c02c907809fb4a79cfb3f62b1ab3c/' + word +'/json';

  http.get(url, function(response) {
    response.setEncoding('utf8');

    response.on("data", function(data) {
      console.log(word, data)//[partOfSpeech]['syn'] + data[partOfSpeech]['sim']);
      //fs.writeFile('queries.json', JSON.stringify(data), function(err) {
      //  if (err) throw err;
      //  console.log('It\'s saved for ' + word + '!');
      //});
    });
    
  });
}

nounList.forEach(function(word) {
  logList(word, 'noun')
});
adjList.forEach(function(word) {
  logList(word, 'adjective')
});
