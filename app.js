let isDobOpen = false;
let dateOfBirth;
const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDobBtnEl = document.getElementById("afterDobBtn");
const dobBtnEl = document.getElementById("dobBtn");
const dobInputEl = document.getElementById("dobInput");

const yearsEl = document.getElementById("year");
const monthsEl = document.getElementById("month");
const daysEl = document.getElementById("day");
const hoursEl = document.getElementById("hour");
const minutesEl = document.getElementById("minute");
const secondsEl = document.getElementById("second");

const makeTowDigitsNumber = (number) => {
  return number > 9 ? number : `0${number}`;
};

// console.log(yearsEl,monthsEl,daysEl,hoursEl,minutesEl,secondsEl);

// console.log(settingCog,settingContent);/

const toggleDateOfBirthSelector = () => {
  if (isDobOpen) {
    settingContentEl.classList.add("hide");
  } else {
    settingContentEl.classList.remove("hide");
  }
  isDobOpen = !isDobOpen;

  console.log(isDobOpen, "toggle");
};
const updateTime = () => {
  const currentDate = new Date();
  const dateDiff = currentDate - dateOfBirth;
  const years = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12);
  const days = Math.floor((dateDiff / (1000 * 60 * 60 * 24)) % 30);
  const hours = Math.floor((dateDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((dateDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((dateDiff / 1000) % 60);

  yearsEl.innerText = makeTowDigitsNumber(years);
  monthsEl.innerText = makeTowDigitsNumber(months);
  daysEl.innerText = makeTowDigitsNumber(days);
  hoursEl.innerText = makeTowDigitsNumber(hours);
  minutesEl.innerText = makeTowDigitsNumber(minutes);
  secondsEl.innerText = makeTowDigitsNumber(seconds);
  // console.log(years, months, "datediff==>>>");
};

const localStorageGetter = () => {
  const years = localStorage.getItem("years");
  const months = localStorage.getItem("months");
  const days = localStorage.getItem("days");
  const hours = localStorage.getItem("hours");
  const minutes = localStorage.getItem("minutes");
  const seconds = localStorage.getItem("seconds");

  if (years && months && days) {
    dateOfBirth = new Date(years, months, days, hours, minutes, seconds);
  }

  updateTime();
};

const contentToggler = () => {
  updateTime();
  if (dateOfBirth) {
    initialTextEl.classList.add("hide");
    afterDobBtnEl.classList.remove("hide");

    setInterval(() => updateTime(), 1000);
  } else {
    afterDobBtnEl.classList.add("hide");
    initialTextEl.classList.remove("hide");
  }
};

const dobBtnHandler = () => {
  const dateString = dobInputEl.value;

  dateOfBirth = dateString ? new Date(dateString) : null;

  console.log({ dateOfBirth });

  if (dateOfBirth) {
    localStorage.setItem("years", dateOfBirth.getFullYear());
    localStorage.setItem("months", dateOfBirth.getMonth());
    localStorage.setItem("days", dateOfBirth.getDay());
    localStorage.setItem("hours", dateOfBirth.getHours());
    localStorage.setItem("minutes", dateOfBirth.getMinutes());
    localStorage.setItem("seconds", dateOfBirth.getSeconds());

    // updateTime();
  } else {
  }
  setInterval(() => updateTime(), 1000);

  contentToggler();
};

localStorageGetter();
contentToggler();

settingCogEl.addEventListener("click", toggleDateOfBirthSelector);
dobBtnEl.addEventListener("click", dobBtnHandler);
