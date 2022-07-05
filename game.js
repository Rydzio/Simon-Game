var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];
var level = 0;
var started = false;

$(document).keydown(function(event){
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success!");
    if (userClickedPattern.length === gamePattern.length) {
      // Good answer
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // Wrong answer
    startOver();
  }
}

function startOver() {
  playSound("wrong");
  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");

  level = 0;
  gamePattern = [];
  started = false;
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass(".pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
