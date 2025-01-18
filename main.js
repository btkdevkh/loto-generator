// HTML Elements
const grillNumsEl = document.querySelector(".grill-1-50");
const startNumsEl = document.querySelector(".grill-1-12");
const generateBtnEl = document.querySelector(".generate-btn");
const resultEl = document.querySelector(".result");
const timerEl = document.querySelector(".timer");

// Helpers
import { countDown } from "./helpers.js";

// Data
let nums = [];
let starNums = [];

// Functions
const createHTMLElementNumber = (qty, className, grill) => {
  for (let i = 1; i <= qty; i++) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.textContent = i;
    grill.append(div);
  }
};

const generateNums = () => {
  let num = Math.floor(Math.random() * 50 + 1);

  while (num === 0) {
    num = Math.floor(Math.random() * 50 + 1);
  }

  return num;
};

const generateStarNums = () => {
  let num = Math.floor(Math.random() * 12 + 1);

  while (num === 0) {
    num = Math.floor(Math.random() * 12 + 1);
  }

  return num;
};

const generateLottery = () => {
  nums = [];
  starNums = [];

  for (let i = 1; i <= 5; i++) {
    const num = generateNums();

    if (nums.includes(num)) {
      nums.push(generateNums());
    } else {
      nums.push(num);
    }
  }

  for (let i = 1; i <= 2; i++) {
    const num = generateStarNums();

    if (starNums.includes(num)) {
      starNums.push(generateStarNums());
    } else {
      starNums.push(num);
    }
  }

  Array.from(grillNumsEl.children).forEach((child) => {
    if (nums.includes(Number(child.textContent))) {
      child.style.transition = "all .3s";
      child.style.backgroundColor = "#5a3afd";
    } else {
      child.style.backgroundColor = "";
    }
  });

  Array.from(startNumsEl.children).forEach((child) => {
    if (starNums.includes(Number(child.textContent))) {
      child.style.transition = "all .3s";
      child.style.backgroundColor = "crimson";
    } else {
      child.style.backgroundColor = "";
    }
  });
};

const resetFlashBtn = (disabled) => {
  if (disabled) {
    generateBtnEl.textContent = "Flashing...";
    generateBtnEl.style.cursor = "not-allowed";
    generateBtnEl.disabled = disabled;

    return;
  }

  generateBtnEl.textContent = "Flash";
  generateBtnEl.style.cursor = "pointer";
  generateBtnEl.disabled = false;
};

// Events
createHTMLElementNumber(50, "num", grillNumsEl);
createHTMLElementNumber(12, "star-num", startNumsEl);
generateBtnEl.addEventListener("click", () => {
  resultEl.innerHTML = "";
  resultEl.style.padding = "";

  generateLottery();
  resetFlashBtn(true);

  const timer1 = setInterval(() => {
    generateLottery();
  }, 200);

  let min = 3;
  let milliseconds = new Date(min).setMinutes(min);

  let minuteToSecond = min * 60;
  countDown(minuteToSecond, timerEl);

  const timer2 = setInterval(() => {
    minuteToSecond--;
    countDown(minuteToSecond, timerEl);
  }, 1000);

  setTimeout(() => {
    clearInterval(timer1);
    clearInterval(timer2);
    resetFlashBtn(false);

    // Result stuff
    resultEl.style.padding = "1rem";

    nums
      .sort((a, b) => a - b)
      .forEach((num) => {
        const div = document.createElement("div");
        div.classList.add("result-flash");
        div.style.backgroundColor = "#5a3afd";
        div.textContent = num;

        resultEl.append(div);
      });

    const div = document.createElement("div");
    div.style.marginLeft = ".5rem";
    resultEl.append(div);

    starNums
      .sort((a, b) => a - b)
      .forEach((num) => {
        const div = document.createElement("div");
        div.classList.add("result-flash");
        div.style.backgroundColor = "crimson";
        div.textContent = num;

        resultEl.append(div);
      });
  }, milliseconds);
});
