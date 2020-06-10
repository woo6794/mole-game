var display = document.querySelector(".display");
var timeEl = displays.querySelector(".time");
var scoreEl = displays.querySelector(".score");
var highScoreEl = displays.querySelector("highScore");
var holes = document.querySelectorAll("hole");
var holeWrap = document.querySelector(".hole-wrap");
var moles = document.querySelectorAll(".mole");
var startBtnEl = document.querySelector(".startBtn");
var _interval;
var isStarted;
var catched;
var debounceCheck;
var gameTime = 1000*60;

var addEvents = function () {
    startBtnEl.addEventListener("click", start);
    holes.forEach(function (hole,i) {
        hole.addEventListener("click", catchMole);
    });
};

var start = function () {
    if (!isStarted) {
        isStarted = true;
        moleInterval();
    }
};

var setScore = function (score) {
    scoreEl.value = "현재 점수 : " + score.toString();
    scoreEl.setAttribute('data-score', score);
};

var getScore = function () {
    return parseInt(scoreEl.getAttribute('data-score'),10);
}

var setHighScore = function () {
    var _score = getScore();
    var _highScore = 
}