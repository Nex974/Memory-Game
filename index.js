function animateButton(buttonId) {
    let button = $(`#${buttonId}`);
    button.addClass("pressed");
    setTimeout(() => {
        button.removeClass("pressed");
    }, 60);
}
function buttonSound(array) {
    for (let i = 0; i < array.length; i++) {
        setTimeout(function() {
            let color = array[i];
            animateButton(color);
            console.log(color);
            var audio = new Audio(`./sounds/${color}.mp3`);
            audio.play();
        }, i * 700);
    }
}

function nextSequence () {
    let buttonColors = ['red','blue','green','yellow'];
    let randomColor = buttonColors[Math.floor(Math.random() * 4)];
    return randomColor;
};

function currentLevelSequence (level) {
    let gamePattern = [];
    for (let i = level; i > 0; i-- ) {
    gamePattern.push(nextSequence());
    };
    return gamePattern;
};

function choiceCheck(clickedButton) {
    if (gamePattern.length > 0 && gamePattern[0] === clickedButton) {
        gamePattern.shift();
        if (gamePattern.length === 0) {
            level++;
            setTimeout( function() {
                startGame();
            }, 500);
        }
    } else {
        gameActive = false;
        $("h1").text("Game over, press W to restart")
        var loseAudio = new Audio(`./sounds/wrong.mp3`);
        loseAudio.play();
        level = 1;
    }
}


function startGame () {
    $("h1").text(`Level ${level}`)
    gamePattern = currentLevelSequence(level);
    animateButton(gamePattern);
    buttonSound(gamePattern);
    gameActive = true;
    console.log(gamePattern);
};

let gamePattern = [];
let level = 1;
let gameActive = false;

$(".btn").on("click", function () {
    let clickedButton = $(this).attr("id");
    if (gameActive) {
        animateButton(clickedButton);
        var audio = new Audio(`./sounds/${clickedButton}.mp3`);
        audio.play();
        choiceCheck(clickedButton);
    };
});
$(document).on("keypress", function (event) {
    let keyPressed = event.key;
    if (keyPressed === "w" && !gameActive) {
        startGame();
    };
});
