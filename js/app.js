var myNumber = Math.ceil(Math.random() * 100);
var guesses = 5;
var firstDone = false;
var guessList = [];

var synsAwful, synsOkay, synsCompetent, synsSmart, synsPerson, type;

var insults = {
  '100': function() {
    if (!synsAwful) {
      synsAwful = getSynAdjs('stupid');
    }
    if (!synsPerson) {
      synsPerson = getSynNouns(type);
    }
    var adj = randomItem(synsAwful);
    var aOrAn = getAorAn(adj);
    return 'You are ' + aOrAn + adj + ' ' + randomItem(synsPerson) + '.';
  },
  '50': function() {
    if (!synsOkay) {
      synsOkay = getSynAdjs('average');
    }
    if (!synsPerson) {
      synsPerson = getSynNouns(type);
    }
    var adj = randomItem(synsOkay);
    var aOrAn = getAorAn(adj);
    return 'You are ' + aOrAn + adj + ' ' + randomItem(synsPerson) + '.';
  },
  '20': function() {
    if (!synsCompetent) {
      synsCompetent = getSynAdjs('competent');
    }
    if (!synsPerson) {
      synsPerson = getSynNouns(type);
    }
    var adj = randomItem(synsCompetent);
    var aOrAn = getAorAn(adj);
    return 'You are ' + aOrAn + adj + ' ' + randomItem(synsPerson) + '.';
  },
  '5': function() {
    if (!synsSmart) {
      synsSmart = getSynAdjs('lucky');
    }
    if (!synsPerson) {
      synsPerson = getSynNouns(type);
    }
    var adj = randomItem(synsSmart);
    var aOrAn = getAorAn(adj);
    return 'You are ' + aOrAn + adj + ' ' + randomItem(synsPerson) + '.';
  },
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
  var url = 'http://words.bighugelabs.com/api/2/777c02c907809fb4a79cfb3f62b1ab3c/' + word +'/json';
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
  $('.formsep').after('<p>Your entry was ' + guess + '</p>');

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
    type = "human";
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






