var displays = document.querySelector(".display");
var timeEl = displays.querySelector(".time");
var scoreEl = displays.querySelector(".score");
var highScoreEl = displays.querySelector(".highScore");
var holes = document.querySelectorAll(".hole");
var holeWrap = document.querySelector(".hole-wrap");
var moles = document.querySelectorAll(".mole");
var startBtnEl = document.querySelector(".startBtn");
var _interval;
var isStarted;
var catched;
var debounceCheck;
var gameTime = 1000 * 60;
// test
var addEvents = function () {
  startBtnEl.addEventListener("click", start);
  holes.forEach(function (hole, i) {
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
  return parseInt(scoreEl.getAttribute('data-score'), 10);
}

var setHighScore = function () {
  var _score = getScore();
  var _highScore = getHighScore();
  if (_highScore < _score) {
    highScoreEl.value = "최고 점수 : " + _score.toString();
    highScoreEl.setAttribute('data-score', _score);
  }
};

var getHighScore = function () {
  return parseInt(highScoreEl.getAttribute('data-score'), 10);
}

var setTime = function (time) {
  timeEl.value = "남은 시간 : " + time;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var moleInterval = function () {
  if (!_interval) {
    var time = 60;
    setTime(time);
    holeWrap.classList.add("is-started");
    setScore(0);
    _interval = setInterval(function () {
      if (time !== 0) {
        setTime(--time);
      }
      var comeUpNum = getRandomIndex(3);
      var _arr = [];
      for (var i = 0; i <= comeUpNum; i++) {
        var ranIdx = getRandomIndex(9);
        if (!_arr.length) {
          _arr.push(ranIdx);
          continue;
        }
        var hasIdx = _arr.some(function (item) {
          return item === ranIdx;
        });
        if (hasIdx) {
          i--;
        } else {
          _arr.push(ranIdx);
        }
      }
      _arr.forEach(function (idx) {
        requestAnimationFrame(function () {
          toggleOn(idx);
        });
      });
    }, 1000);
    setTimeout(function () {
      holeWrap.classList.remove("is-started");
      clearInterval(_interval);
      setTimeout(function () {
        setHighScore();
      }, 2000);
      _interval = null;
      isStarted = false;
    }, gameTime);
  }
};

var toggleOn = function (index) {
  holes[index].classList.add("come-up");
  holes[index].classList.add("moving");
  setTimeout(function () {
    holes[index].classList.remove("come-up");
  }, 1000);
  setTimeout(function() {
    holes[index].classList.remove('moving');
  }, 2000);
};

var catchMole = function () {
  var checkMole = this.classList.contains("moving");
  var that = this;
  if (checkMole) {
    var _debounce = debounce(function() {
      that.classList.remove("come-up");
      that.classList.remove("moving");
      var _score = getScore();
      setScore(_score + 1);
    }, 100);
    _debounce();
  }
};

var debounce = function(callback, milliseconds) {
    return function () {
      // clearTimeout을 이용하여 이벤트 발생을 무시해주고,
      // 마지막 호출 이후, 일정 시간이 지난 후에 단 한 번만, 이벤트가 호출되도록 하였습니다.
      clearTimeout(debounceCheck);
      debounceCheck = setTimeout(function() {
        callback.call(this);
      }, milliseconds);
    }
}

addEvents();
