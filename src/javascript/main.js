var displays = document.querySelector(".display");
var timeEl = displays.querySelector(".time");
var scoreEl = displays.querySelector(".score");
var highScoreEl = displays.querySelector(".highScore");
var holes = document.querySelectorAll(".hole");
var moles = document.querySelectorAll(".mole");
var startBtnEl = document.querySelector(".startBtn");
var _interval;
var isStarted;
var catched;
var comeUpNum = 2;
var gameTime = 1000*60;
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
 
var setScore = function () {
  // adasd asdas dsa dasdasd asas d
};

var setHighScore = function () {
  // hdlksfjskadlfj ksladfj lksadjflk asdjfl sadjlkf sd
};

var setTime = function (time) { 
  timeEl.value = '남은 시간 : ' + time;
}

var getRandomIndex = function(max){
  return Math.floor(Math.random()*max);
}

var moleInterval = function () {
  var time = 60;
  setTime(time);
  if (!_interval) {
    _interval = setInterval(function () {
      var comeUpNum = getRandomIndex(3);
      var _arr = [];
      for (var i = 0; i <= comeUpNum; i++) {
        var ranIdx = getRandomIndex(9);
        if ( !_arr.length ){
          _arr.push(ranIdx);
          continue;
        }
        var hasIdx = _arr.some(function(item){
          return item === ranIdx;
        });
        if (hasIdx){
          i--;
        } else {
          _arr.push(ranIdx);
        }
        }
       _arr.forEach(function(idx){
         requestAnimationFrame()
       })
      }
 
    },1000);
    setTimeout(function(){
      clearInterval(_interval);
      _interval = null;
    },gameTime);
  }
};

var toggleOn = function (index) {
  holes[index].classList.add("come-up");
  setTimeout(function(){
    holes[index].classList.remove("come-up");
  },1000);
};

var catchMole = function () {

};
