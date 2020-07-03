// Function to use vh & vw units
function vh(v) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (v * w) / 100;
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

disableScroll();

/**************************************************************************** */
/*********************** Start navigation ********************************** */
/************************************************************************** */

// Prière au bon seigneur des devs de ne jamais me forcer à revenir sur ce code, merci :)
/*
                          ______......------.
  ______......------''''''                   -.
  \                                            -.
  |\                                             -.
  | \                                              -.
  |  \                                               -.
  |   \                                                - __
  |    \                         ______......------'''''' |
  |   __\______......------''''''  o   ______......---.o  |
  |   | .  o -=-- . |O|O| . O     '    ||o o o       ||   |
  |   |o                               ||____......---|   |
  |   |       ____.... ....---         ||''''|____||_.|   |
  |   |       ....---- ----'''         ||'''''       ||  |'.
  |   ||'.    ....---- ----'''         ||o o o       ||  '. |
  |   |'. |   ....---- ----'''         ||____......---|   | |
  |   | | |   ....---- ----'''         ||''''|____||_.|   | |
  |   | | |   ....---- ----'''         ||'''''       ||   | |
  |   | | |   ....---- ----'''         ||o o o       ||   | |
  |   | | |   ....---- ----'''         ||____......---|   | |
  |   | | |   ....---- ----'''         ||''''|____||_.|   | |
  |   | | |                            ||'''''       ||  .'.'
  |   | | |   ____....----''''|        ||o o o       ||  _|
  |   |.'.'  |   ___....---   |        ||____......---| (_
  |   |_     |____....----''''|        ||''''|____||_.|  _|
  :    _)    |     __....-.   |        ||'''''       || (_
   :  |_     |     |_....-'   |   GOD  ||o o o       ||   |
    '  _)    |____....----''''|  BLESS ||____......---|  o|
    '.|      | ___....----'': |   ME   ||''''|____||_.|   |
     '|o     | |__....----''' |  /__\  :.'''''           _|
      |  .   :____....----'''''  ______......------''''''
      |   _____......------''''''
       '''
*/

var container = document.querySelector(".view__container");
var positions = [
  [13,14,15,16],
  [4,5,6,7,8],
  [1,2,3],
  [9,10,11,12]
]
var index = 0;

function addEventListener(array) {
  window.addEventListener(
    "wheel",
    function (el) {
        var prevPosition = array[index];
        var position;
        if (el.deltaY > 0.1 && index < array.length - 1) {
          index++;
          position = array[index]
          container.classList.replace(
            `position--${prevPosition}`,
            `position--${position}`
          );
        } else if (el.deltaY < -0.1) {
          if(index == 0) {
            container.classList.replace(
              `position--${prevPosition}`,
              `position--0`
            );
            return;
          }
          index--;
          position = array[index]
          container.classList.replace(
            `position--${prevPosition}`,
            `position--${position}`
          );
        } 
        setTimeout(() => {
          addEventListener(array);
        }, 2000); 
    },
    { passive: true, once: true }
  );
}

document.addEventListener("mousemove", function (e) {
  container.style.left = `${vw(5) - e.clientX * 0.1}px`;
  container.style.top = `${vh(5) - e.clientY * 0.1}px`;
  document.querySelector(".title__view--home").style.transform = `translate(${
    vh(5) - e.clientX * 0.05
  }px, ${vh(5) - e.clientY * 0.05}px)`;
});

var chapters = document.querySelectorAll(".chapter");

for (let i = 0; i < 4; i++) {
  var chapter = chapters[i];

  chapter.addEventListener("mouseover", function (event) {
    event.path[1].querySelectorAll(".element").forEach((element, index) => {
      element.classList.add(`hovered--${index + 1}`);
    });
  });

  chapter.addEventListener("mouseout", function (event) {
    event.path[1].querySelectorAll(".element").forEach((element, index) => {
      element.classList.remove(`hovered--${index + 1}`);
    });
  });

  chapter.addEventListener("click", function (target) {
    var numChapter = target.path[1].dataset.chapter - 1;
    container.classList.replace(
      `position--0`,
      `position--${positions[numChapter][0]}`
    );
    setTimeout(() => {
      addEventListener(positions[numChapter]);
    }, 2000);
  });
}