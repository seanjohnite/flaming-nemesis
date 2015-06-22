var myNumber = Math.ceil(Math.random() * 100);
var guesses = 5;
var firstDone = false;
var guessList = [];

var synsAwful, synsOkay, synsCompetent, synsSmart, synsPerson, type;

var queries = {
  person: ["individual","someone","somebody","mortal","soul","anatomy",
  "being","bod","build","causal agency","causal agent","cause",
  "chassis","figure","flesh","form","frame","grammatical category",
  "human body","material body","organism","physical body","physique",
  "shape","soma","syntactic category"],
  human: ["homo","man","human being","hominid","anthropoid"],
  stupid: ["dazed","stunned","stupefied","unintelligent","stupid","unintelligent",
  "retarded","anserine","blockheaded","boneheaded","brainless","cloddish","confused",
  "dense","dim","doltish","dopey","dopy","dull","dumb","fatheaded","feebleminded",
  "foolish","gaumless","gooselike","goosey","goosy","gormless","half-witted",
  "headless","idiotic","imbecile","imbecilic","jerky","loggerheaded","lumpen",
  "lumpish","moronic","nitwitted","obtuse","senseless","slow","slow-witted",
  "soft-witted","thick","thick-skulled","thickheaded","unthinking","weak","witless"],
  average: ["ordinary","fair","mediocre","middling","intermediate","medium","mean",
  "median","modal","ordinary","common","moderate","normal"],
  competent: ["capable","efficient","qualified","able","adequate",
  "capable","effective"],
  intelligent: ["well-informed","healthy","levelheaded","level-headed",
  "sound","reasoning","thinking","precocious","smart","agile","alert","apt",
  "born","brainy","bright","brilliant","clever","innate","natural","nimble",
  "prehensile","quick","rational","ready","reasonable","scintillating","searching",
  "sensible","smart","smart as a whip","sophisticated","trenchant"]
}

function phrase(word) {
  if (word in queries) {
    synsAdjs = queries[type];
  } else {
    synsAdjs = getSynAdjs(type);
  }
  if (type in queries) {
    synsPerson = queries[type];
  } else {
    synsPerson = getSynNouns(type);
  }
  console.log(type);
  console.log(queries);
  console.log(queries.type);
  console.log(getSynAdjs(type));
  var adj = randomItem(synsAdjs);
  var aOrAn = getAorAn(adj);
  debugger;
  return 'You are ' + aOrAn + adj + ' ' + randomItem(synsPerson) + '.';
}


var insults = {
  '100': function() {
    return phrase('stupid');
  },
  '50': function() {
    return phrase('average');
  },
  '20': function() {
    return phrase('competent');
  },
  '5': function() {
    return phrase('intelligent');
  }
}

function getAorAn(string) {
  if (string[0].match(/[aeiou]/)) {
    return "an ";
  } else {
    return "a ";
  }
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

function getSynonyms(word) {
  var url = 'http://words.bighugelabs.com/api/2/777c02c907809fb4a79cfb3f62b1ab3c/' + 
    word +'/json';
  var jsonObj = JSON.parse(httpGet(url));
  return jsonObj;
}

function getSynAdjs(word) {
  return getSynonyms(word).adjective.syn;
}

function getSynNouns(word) {
  return getSynonyms(word).noun.syn;
}

function win() {
  $('.jumbotron>h1').text('The Flaming Nemesis has been extinguished');
  $('html, body').css('background-color', '#3399cc');
  $('.container').css('box-shadow', 'none');
  $('.container').css('background-color', '#003366');
}

function submit() {
  function insult(degree) {
    var ins = insults[degree]();
    if (diff < 0) {
      ins += " Try higher.";
    }
    else {
      ins += " Try lower."
    }
    $('.formsep').after('<p class="response">Not ' + guess + '. ' + ins + '</p>')
  }

  $('.response').remove();
  $('.answer').remove();

  var guess = $('#guess').val();

  if (!guess) {
    $('.formsep').after('<p class="response">You didn\'t guess anything.</p>')
    return;
  } else if (guessList.indexOf(guess) != -1) {
    $('.formsep').after('<p class="response">You\'ve already guessed ' + guess + '.</p>')
    return;
  }

  guesses--;

  
  var diff = guess - myNumber;

  $('#guess').val("");

  if (guess == myNumber) {
    $('.formsep').after('<p class="response">You got it! ' + guess + '!</p>');
    win();
    $('.submit-button').addClass('disabled');
  } else if (guesses < 1) {
    $('.submit-button').addClass('disabled');
    $('.response').remove();
    $('.formsep').after('<p class="response">Too bad. You lose. Correct number was ' + myNumber + '</p>')
  } else if (Math.abs(diff) < 20) {
    insult(5);
  } else if (Math.abs(diff) < 20) {
    insult(20);
  } else if (Math.abs(diff) < 50) {
    insult(50);
  } else {
    insult(100);
  }

  guessList.push()

  $('.guess-display').text(guesses);
  $('#guess').focus();5

  //$('.formsep').after('<p class="answer">My number was ' + myNumber + '</p>');
  //$('.formsep').after('<p class="answer">Your guess was ' + guess + '</p>');
}

function firstTask() {
  if ($('#person').val())
    type = $('#person').val();
  else
    type = "person";
  firstDone = true;
  $('.query').addClass('hidden');
  $('.main').removeClass('hidden');
  $('#guess').focus();
}

$(document).ready(function() {
  

  $('#person').focus();

  


  $('.first-button').on('click', firstTask);

  $("#person").keyup(function (e) {
    if (e.keyCode == 13) {
      firstTask();
    }
  });

  $('.submit-button').on('click', submit);

  $("#guess").keyup(function (e) {
    if (e.keyCode == 13) {
      submit();
    }
  });

  $('.start-over').on('click', function() {
    location.reload(true);
  });


});






