var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var levelNo = 0;

$(".start-btn").click(function () {
    $(this).css("visibility", "hidden");
    gamePattern = [];
    userClickedPattern = [];
    levelNo = 0;
    $("#level-title").text("Level " + levelNo);
    nextSequence();
})

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(this);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    userClickedPattern = [];
    levelNo++;
    $("#level-title").text("Level " + levelNo);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    var buttonChoosen = $("#" + randomColor);
    buttonChoosen.fadeOut(100).fadeIn(100);
    playSound(randomColor);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currButton) {
    $(currButton).addClass("pressed");
    setTimeout(function () {
        $(currButton).removeClass("pressed");
    }, 100);
}

function checkAnswer(currLevel) {
    if (userClickedPattern[currLevel] === gamePattern[currLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        $("h1").text("Game Over, Start Again!");
        $(".start-btn").css("visibility", "visible")
    }
}