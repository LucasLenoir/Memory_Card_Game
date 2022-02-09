//$ /////////////////
//$ enterANIM///////
//$ ///////////////
const grid = document.querySelector(".m-grid");
const tl = new TimelineMax();
TweenLite.set(grid, {
  transformPerspective: 400,
  transformOrigin: "50% 50%",
});
const anim2Props = {
  rotationX: 75,
  y: "0%",
  ease: Power2.easeIn,
  transformPerspective: 300,
  onComplete: () => grid.classList.add("is-animating"),
};
tl.to(grid, 1, { scaleY: 1.5, ease: Power3.easeIn })
  .to(grid, 1, anim2Props, "+=0.3")
  .to(".m-logo__wrap", 1, { scale: 1 });

//***************
//* DECLARATION *
//***************
const gridCard = document.querySelector("#grid");
const startSection = document.querySelector("#showcase");
const setUpSection = document.querySelector("#showcase1");
const gameSection = document.querySelector("#showcase2");
const time = document.querySelector("#time");
const playerMatches = document.querySelector("#score");
const btnEnter = document.querySelector("#btnEnter");
const btnStart = document.querySelector("#start");

let data = [];
const gameinfo = document.querySelector(".gameInfo");
let flippedCards = [];
let length = data.length;
let clicked1,
  clicked2 = false;
const counter = document.querySelector("#scores");
let countercount = 0;
let record;
let timmerStop;
let second;
let minute;
let top5 = [];
let userTime;

//?????????????
//? FUNCTION ??
//?????????????

function reset() {
  data = [];
  flippedCards = [];
  countercount = 0;
  second = 0;
  minute = 0;
}
function randomizeArray(array) {
  let l = array.length;

  for (i = 0; i !== 100; i++) {
    let ud = Math.random() > 0.5 ? true : false;
    let hm = Math.ceil(Math.random() * l);
    let oi = Math.floor(Math.random() * l);
    let ni = ud ? oi + hm : oi - hm;

    if (ni <= l - oi - 1 && ni > -1) {
      v1 = array[oi];
      v2 = array[ni];
      array[ni] = v1;
      array[oi] = v2;
    }
  }
}
function listenClick() {
  data.forEach((card) => {
    card.addEventListener("click", (e) => {
      console.log(flippedCards);
      if (flippedCards.length < 2) {
        flippedCards.push(card);
        toggleFlip(card);
        checkClicked(e);
      }
    });
  });
}

function checkClicked(card) {
  console.log("clics:", !clicked1, !clicked2);
  if (!clicked1) {
    clicked1 = card.srcElement.attributes.id.value;
  } else if (clicked1 && !clicked2) {
    clicked2 = card.srcElement.attributes.id.value;
    checkMatch(clicked1, clicked2, card.target);
    clicked1 = false;
    clicked2 = false;
  }
}
function Matched() {
  flippedCards[0].classList.add("backgroundFound");
  flippedCards[1].classList.add("backgroundFound");

  flippedCards[0].classList.add("nopointer");
  flippedCards[1].classList.add("nopointer");
  countercount += 1;
  counter.innerText = `${countercount}/18`;
  if (countercount === 1) {
    clearInterval(timerStop);
    record = `00:${minutes}:${seconds}`;
    body = new FormData();
    body.append("time", record);
    fetch("Insert.php", {
      method: "POST",
      body,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    console.log(record);
    gameSection.classList.remove("active");
    userTime = document.createElement("div");
    document.body.appendChild(userTime);
    
    userTime.classList.add("btn");
    userTime.classList.add("active");
    userTime.innerText = record;
    console.log(userTime);

    setTimeout(() => {
      // endGame.classList.remove("active")
      setUpSection.classList.add("ative");
    }, 3000);
  }
  flippedCards = [];
}
function checkMatch(clicked1, clicked2, card) {
  if (clicked1 === clicked2) {
    Matched(card);
  } else if (clicked1 !== clicked2) {
    noMatched(card);
  }
}
function noMatched() {
  console.log("no match");
  flippedCards.forEach((card) => {
    card.classList.remove("flipped");
  });
  setTimeout(() => {
    flippedCards[0].classList.add("background");
    flippedCards[1].classList.add("background");
    flippedCards = [];
  }, 1000);
}
function toggleFlip(card) {
  card.classList.remove("background");
  card.classList.add("flipped");
}
function cardGenerator() {
  for (i = 0; i < 18; i++) {
    const card = document.createElement("div");
    card.style.background = `50% ${
      100 * -i
    }px  no-repeat url(../src/Media/img/cards.png), white`;
    card.classList.add("card");
    card.classList.add("background");
    card.setAttribute("id", i);
    data.push(card);
    length = data.length;
    if (i === 17 && length < 35) {
      i = -1;
    }
  }
  randomizeArray(data);
  for (w = 0; w < length; w++) {
    gridCard.appendChild(data[w]);
  }
  listenClick();
}
function countdown() {
  second = 0;
  minute = 0;
  minutes = 0;
  seconds = 0;
  timer = document.createElement("div");
  timer.classList.add("btn");
  timer.classList.add("timer");
  gameinfo.appendChild(timer);
  timerStop = setInterval(() => {
    second++;
    console.log(second);
    console.log(minute);
    if (second === 59) {
      minute++;
      second = 0;
    }
    minutes = minute < 10 ? "0" + minute : minute;
    seconds = second < 10 ? "0" + second : second;

    timer.innerText = `00:${minutes}:${seconds}`;
  }, 1000);
}
//!!!!!!!!!!!!!!!!!
//! EXECUTION !!!!!
//!!!!!!!!!!!!!!!!!
btnEnter.addEventListener("click", () => {
  startSection.classList.add("nonActive");
  setUpSection.classList.add("active");
  console.log("yoyoyo");
  records = document.createElement("Div");
  setUpSection.appendChild(records);
  records.className = "records activeContainer";
  fetch("top5.php")
    .then((res) => res.json())
    .then((res) => {
      top5 = res;
      top5.forEach((time) => {
        div = document.createElement("p");
        records.appendChild(div);
        div.innerText = time.time;
      });
    });
});
btnStart.addEventListener("click", () => {
  setUpSection.classList.remove("active");
  gameSection.classList.add("active");
  reset();
  cardGenerator();

  countdown();
});
