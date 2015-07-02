var myNumber = Math.ceil(Math.random() * 100);
var guesses = 5;
var guessList = [];
var hotList = [];
var coldList = [];

var type;

var queries = {
  person: ["individual","someone","somebody","mortal","soul","anatomy",
  "being","bod","causal agent",
  "chassis","figure","flesh","form",
  "human","organism","physical body",
  "shape"],
  human: ["person", "man","human being","hominid","anthropoid"],
  stupid: ["dazed","stunned","stupefied","stupid","unintelligent",
  "retarded","anserine","blockheaded","boneheaded","brainless","cloddish","confused",
  "dense","dim","doltish","dopey","dull","dumb","fatheaded","feebleminded",
  "foolish","gaumless","gooselike","goosey","goosy","gormless","half-witted",
  "headless","idiotic","imbecilic","jerky","loggerheaded","lumpen",
  "lumpish","moronic","nitwitted","obtuse","senseless","slow","slow-witted",
  "soft-witted","thick","thick-skulled","thickheaded","unthinking","weak","witless"],
  average: ["ordinary","fair","mediocre","middling","intermediate",
  "median","modal","ordinary","common","moderate","normal"],
  competent: ["capable","efficient","qualified","able","adequate",
  "effective"],
  intelligent: ["well-informed","healthy",
  "sound","reasoning","thinking","precocious","smart","agile","alert",
  "born","brainy","bright","brilliant","clever","innate","nimble",
  "prehensile","quick","rational","ready","reasonable","scintillating","searching",
  "sensible","smart","sophisticated"]
}

function phrase(word, phraseType) {
  if (word in queries) {
    synsAdjs = queries[word];
  } else {
    synsAdjs = getSynAdjs(word);
  }
  if (type in queries) {
    synsPerson = queries[type];
  } else {
    synsPerson = getSynNouns(type);
  }
  var adj = randomItem(synsAdjs);
  var noun = randomItem(synsPerson);
  return phraseType(adj, noun);
}

function standardPhrase(adj, noun) {
  var aOrAn = getAorAn(adj);
  return 'You are ' + aOrAn + adj + ' ' + noun + '. ';
}

function iceColdPhrase(adj, noun) {
  var prePhrase = standardPhrase(adj, noun);
  return prePhrase;
}


var insults = {
  '100': function() {
    return phrase('stupid', standardPhrase);
  },
  '50': function() {
    return phrase('average', standardPhrase);
  },
  '20': function() {
    return phrase('competent', standardPhrase);
  },
  '5': function() {
    return phrase('intelligent', standardPhrase);
  }
}

function insult(degree, diff, guess) {
  var ins = insults[degree]();
  if (diff < 0) {
    ins += '<p>Try higher.</p>';
  }
  else {
    ins += '<p>Try lower.</p>';
  }
  $('.response').append('<p>Not ' + guess + '. ' + ins + '</p>');
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

function win() {
  $('.jumbotron>h1').text('The Flaming Nemesis has been extinguished');
  $('html, body').css('background-color', '#3399cc');
  $('.container').css('box-shadow', 'none');
  $('.jumbotron>h1').css('font-size', '2em');
  $('.container').css('background-color', '#003366');
  $('.section').addClass('tada').addClass('animated')
}

function lose(diff, guess) {
  if (Math.abs(diff) < 20)
    showGuess('hot', guess);
  else
    showGuess('cold', guess);
  $('.submit-button').addClass('disabled');
  $('.response').html('');
  $('.response').append('<p>Too bad. You lose. Correct number was ' + myNumber + '.</p>')
  $("#guess").off('.guess');
}

function submit() {
  // get guess and clear old responses
  var guess = $('#guess').val();
  $('.response').html('');

  // make sure guess is good/reasonable -- if not, respond accordingly.
  if (!guess) {
    $('.response').append('<p>You didn\'t guess anything.</p>')
    return;
  } else if (guessList.indexOf(guess) != -1) {
    $('.response').append('<p>Idiot! You\'ve already guessed ' + guess + '.</p>')
    return;
  } else if (isNaN(guess)) {
    guess = guess[0].toUpperCase() + guess.split('').slice(1).join('');
    $('.response').append('<p>' + guess + ' isn\'t even a number.</p>');
    return;
  } else if (guess < 1 || guess > 100) {
    $('.response').append('<p>Right. I\'m gonna pretend you didn\'t guess out of the range.</p>')
    return;
  }
  // decrement number of guesses
  guesses--;

  // figure out how to respond based on guess/number difference, respond
  var diff = guess - myNumber;
  if (guess == myNumber) {
    $('.response').append('<p>You got it! ' + guess + '!</p>');
    win();
    $('.submit-button').addClass('disabled');
    $("#guess").off('.guess');
    showGuess('hot', guess);
  } else if (guesses < 1) {
    lose(diff, guess);
  } else if (Math.abs(diff) < 5) {
    insult(5, diff, guess);
    showGuess('hot', guess);
  } else if (Math.abs(diff) < 20) {
    insult(20, diff, guess);
    showGuess('hot', guess);
    } else if (Math.abs(diff) < 50) {
    insult(50, diff, guess);
    showGuess('cold', guess);
  } else {
    insult(100, diff, guess);
    showGuess('cold', guess);
  }

  // update guesses left, update guess list
  guessList.push(guess);

  $('.guess-display').text(guesses);

  $('#guess').val('').focus();
}

function showGuess(str, guess) {
  $('<li></li>').append(guess).addClass(str + '-guess').appendTo($('.' + str+ '-guesses'));
  $('.guess-list').removeClass('hidden');
}

function firstTask() {
  if ($('#person').val()) {
    type = $('#person').val();
    var url = 'http://words.bighugelabs.com/api/2/777c02c907809fb4a79cfb3f62b1ab3c/' + 
      type +'/json';
    $.ajax(url, {
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        queries[type] = response.noun.syn;
      },
      error: function() {
        $('.formsep').append('<p>Sorry, I don\'t know you. I\'m assuming you\'re a person.</p>')
        type = 'person';
      }
    });
  } else
    type = "person";

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

  $('.submit-button').on('click.guess', submit);

  $("#guess").on('keyup.guess', function (e) {
    if (e.keyCode == 13) {
      submit();
    }
  });

  $('.give-up').on('click', function (e) {
    e.preventDefault();
    $('.submit-button').addClass('disabled');
    $('.response').html('');
    $('.response').append('<p>I was thinking of ' + myNumber + '.</p><p>You were.. not close.')
    $("#guess").off('.guess');
  })

  $('.start-over').on('click', function (e) {
    e.preventDefault();
    location.reload(true);
  });


});




