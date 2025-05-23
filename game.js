var userClickedPattern = []; // Stores user clicks
var gamePattern = []; // Stores first pattern
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0; // Initialize level at 0
var started = false;


function nextSequence() {
    level++; // Increase the level
    $("h1").text("Level " + level); // Update the h1 text



    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; // Get the color
    gamePattern.push(randomChosenColour); // Add to pattern

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // Animate

    playSound(randomChosenColour); // Play sound for random selected button
    animatePress(randomChosenColour); // Animate user selected button
}


$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id"); // Get clicked button ID
    userClickedPattern.push(userChosenColour); // Add it to the array

    playSound(userChosenColour); // Play sound for user selected button
    animatePress(userChosenColour); // Animate user selected button

    checkAnswer(userClickedPattern.length - 1); // Call checkAnswer() after a user clicks a button by passing the last index to checkAnswer

});

// function to play sound
function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// function to annimate selected button
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed"); // Add class to clicked button

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed"); // Remove class after 100ms
    }, 100);
}

// Start the game when a key is pressed
$(document).on("keydown", function () {
    if (level === 0) { // Only start if level is 0
        started = true; // Update started state
        userClickedPattern = []; // Reset user clicks
        nextSequence(); // Restart game

    }
});


function checkAnswer(currentLevel) {
    // Check if the user's most recent answer matches the game's pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // Check if the user has completed the sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence(); // Start next level after 1000ms
                userClickedPattern = []; // Reset user pattern for the next level
            }, 1000);
        }
    } else {
        console.log("wrong"); // If the answer is incorrect
        var audio = new Audio(`sounds/wrong.mp3`); // Play sounf if wrong
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over"); // Remove class after 200ms
        }, 100);

        $("h1").text("Game Over, Press Any Key to Restart"); //Change heading

        startOver();
    }
}

function startOver() {
    level = 0; // Reset level
    gamePattern = []; // Clear game pattern
    started = false; // Reset game state
}


