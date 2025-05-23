var userClickedPattern = []; // Stores user clicks
var gamePattern = []; // Stores first pattern
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0; // Initialize level at 0


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
        nextSequence();
    }
});



