var myNumber = Math.ceil(Math.random() * 100);
var guesses = 5;

var insults = {
  '50': [
    '<p class="response">Try again with more trying.</p>',
    '<p class="response">Nice try, meat mind.</p>'],
  '20': [
    '<p class="response">Not bad for a flesh plank.</p>',
    '<p class="response">Maybe keep your day job.</p>'],
}

function insult(degree) {
  $('.formsep').after(insults[degree][Math.floor(Math.random() * 2)])
}

function submit() {
  $('.response').remove();
  $('.answer').remove();
  guesses--;
  var guess = $('#guess').val();
  $('#guess').val("");
  if (guess === myNumber) {
    $('.formsep').after('<p class="response">You got it!</p>');
    $('.submit-button').addClass('disabled');
  } else if (Math.abs(guess - myNumber) < 20) {
    insult(20);
  } else if (Math.abs(guess - myNumber) < 50) {
    insult(50);
  } else {
    $('.formsep').after('<p class="response">You could not be farther.</p>');
  }

  $('.guess-display').text(guesses);

  //$('.formsep').after('<p class="answer">My number was ' + myNumber + '</p>');
  //$('.formsep').after('<p class="answer">Your guess was ' + guess + '</p>');

  if (guesses < 1) {
    $('.submit-button').addClass('disabled');
    $('.response').remove();
    $('.formsep').after('<p class="response">Too bad. You lose.</p>')
  }
}

$(document).ready(function() {
  $('.submit-button').on('click', submit)

  $("#guess").keyup(function (e) {
      if (e.keyCode == 13) {
        submit();
      }
  });

  $('.start-over').on('click', function() {
    location.reload(true);
  });


});






