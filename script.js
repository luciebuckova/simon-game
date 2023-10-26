let buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Starting the Game by Pressing a Key
$(document).keydown(function () {
  if (!started) {
    $('#level-title').text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

// Clicking a Button Sound and Animation
$('.btn').on('click', function () {
  let userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Checking the User's Answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

// Moving to the Next Levels
function nextSequence() {
  userClickedPattern = [];

  level++;
  $('#level-title').text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// Adding Sound to the Buttons
function playSound(name) {
  let audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

// Adding Animations to User Clicks
function animatePress(currentColor) {
  let activeBtn = $('.' + currentColor);
  activeBtn.addClass('pressed');
  setTimeout(function () {
    activeBtn.removeClass('pressed');
  }, 100);
}

// Restarting the Game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
