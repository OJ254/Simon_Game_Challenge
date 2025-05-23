var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour = gamePattern.push(buttonColours[nextSequence()]);

function nextSequence() {
    return Math.floor(Math.random() * 4);
}

console.log(randomChosenColour);
console.log(gamePattern);