// -------------------------------------------------------------
//                 БАЗОВЫЕ ПЕРЕМЕННЫЕ
// -------------------------------------------------------------
const nameInput = document.querySelector(".main__input");
const footerBtn = document.querySelector(".footer__btn");
const footerBtn2 = document.querySelector(".footer__btn-not");
const headerBar = document.querySelector(".header__bar");
const header = document.querySelector(".header");
const main = document.querySelector(".main");
const connect = document.querySelector(".connect");

const mainContents = [
  document.querySelector(".main__content"),
  document.querySelector(".main__content-2"),
  document.querySelector(".main__content-3"),
  document.querySelector(".main__content-4"),
  document.querySelector(".main__content-5"),
  document.querySelector(".main__content-6"),
  document.querySelector(".main__content-7")
];

let currentIndex = 0;

// -------------------------------------------------------------
//                 ПРОГРЕССБАР
// -------------------------------------------------------------
function updateProgress() {
  const total = mainContents.length;
  const current = currentIndex + 1;

  headerBar.style.background = `linear-gradient(to right, #FA6C12 ${
    (current / total) * 100
  }%, #ededed ${(current / total) * 100}%)`;

  mainContents.forEach(block => {
    const page = block.querySelector(".current-page");
    if (page) page.textContent = current;
  });
}

// -------------------------------------------------------------
//                 ПРОВЕРКА СОСТОЯНИЯ КНОПКИ NEXT
// -------------------------------------------------------------
function checkNextBtn() {
  let valid = false;
  const block = mainContents[currentIndex];

  // input обязателен
  const input = block.querySelector("input");
  if (input) valid = input.value.trim() !== "";

  // если есть выбранные элементы (active)
  if (block.querySelectorAll(".active").length > 0) valid = true;

  // блоки по умолчанию валидны
  if (
    block.classList.contains("main__content-3") ||
    block.classList.contains("main__content-4") ||
    block.classList.contains("main__content-7")
  ) valid = true;

  // применение стилей
  if (valid) {
    footerBtn.style.background =
      "linear-gradient(90deg, rgba(255,118,31,1) 0%, rgba(255,119,215,1) 100%)";
    footerBtn.style.color = "#fff";
    footerBtn.disabled = false;
  } else {
    footerBtn.style.background = "#B0B0B0";
    footerBtn.style.color = "#666";
    footerBtn.disabled = true;
  }
}

// -------------------------------------------------------------
//                 ПЕРЕКЛЮЧЕНИЕ БЛОКОВ
// -------------------------------------------------------------
function showNextContent() {
  const block = mainContents[currentIndex];
  const input = block.querySelector("input");

  if (input && input.value.trim() === "") return;

  block.style.display = "none";
  currentIndex++;

  if (currentIndex < mainContents.length) {
    const next = mainContents[currentIndex];
    next.style.display = "block";

    footerBtn2.style.display =
      currentIndex === mainContents.length - 4 ? "block" : "none";

    footerBtn.textContent =
      currentIndex === mainContents.length - 1
        ? "Finish & Continue"
        : "Next";
  } else {
    header.style.display = "none";
    main.style.display = "none";
    connect.style.display = "flex";
    lastContent();
  }

  updateProgress();
  checkNextBtn();
}

footerBtn.addEventListener("click", showNextContent);
footerBtn2.addEventListener("click", showNextContent);

// -------------------------------------------------------------
//                 КНОПКА НАЗАД
// -------------------------------------------------------------
document.querySelector(".header__back").addEventListener("click", () => {
  if (currentIndex === 0) return;

  mainContents[currentIndex].style.display = "none";
  currentIndex--;
  mainContents[currentIndex].style.display = "block";

  footerBtn2.style.display =
    currentIndex === mainContents.length - 4 ? "block" : "none";

  footerBtn.textContent =
    currentIndex < mainContents.length - 1 ? "Next" : footerBtn.textContent;

  updateProgress();
  checkNextBtn();
});

// -------------------------------------------------------------
//                 АНИМАЦИЯ ТОЧЕК
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const frames = ["Dot.svg", "Dot-1.svg", "Dot-2.svg", "Dot-3.svg", "Dot-4.svg"];
  const orange = document.querySelectorAll(".orange__point");
  const purple = document.querySelectorAll(".purple__point");

  let i = 0;
  setInterval(() => {
    orange.forEach((p, idx) => p.src = `./assets/orange/${frames[(idx + i) % 5]}`);
    purple.forEach((p, idx) => p.src = `./assets/purple/${frames[(idx + i) % 5]}`);
    i = (i + 1) % 5;
  }, 100);

  checkNextBtn();  // кнопка изначально серая
});

// -------------------------------------------------------------
//              ОТПРАВКА И ФИНАЛ
// -------------------------------------------------------------
const conectImg = document.querySelector(".connect-img");
const conectTitle = document.querySelector(".conntect__block-title");
const conectDesc = document.querySelector(".connect__block-desc");
const connectBtn = document.querySelector(".connect__btn");
const loader = document.querySelector(".loader");

function lastContent() {
  setTimeout(() => {
    loader.style.display = "none";
    conectImg.style.display = "block";
    conectImg.src = "./assets/link-success.png";
    conectTitle.innerHTML =
      'Link <span class="connect__span">€2800.00</span> Success';
    conectDesc.textContent = "Great work, your account is linked up";
    connectBtn.style.display = "block";
  }, 5000);
}

// -------------------------------------------------------------
//            PURPOSE (2 и 6 блок)
// -------------------------------------------------------------
document.querySelectorAll(".purpose__choose").forEach(block => {
  const img = block.querySelector(".purpose__img");

  block.addEventListener("click", () => {
    block.classList.toggle("active");
    img.src = block.classList.contains("active")
      ? "./assets/Choose.svg"
      : "./assets/notChoose.svg";
    checkNextBtn();
  });
});

// -------------------------------------------------------------
//             AMOUNT (3 блок)
// -------------------------------------------------------------
let currentAmount = 10000;
const amountSum = document.querySelector(".amount-sum");

function updateAmount() {
  amountSum.textContent = currentAmount.toLocaleString();
  checkNextBtn();
}

document.querySelector(".amount__block-minus").addEventListener("click", () => {
  currentAmount += 250;
  updateAmount();
});

document.querySelector(".amount__block-plus").addEventListener("click", () => {
  if (currentAmount > 0) currentAmount -= 250;
  updateAmount();
});

updateAmount();

// -------------------------------------------------------------
//             OUTSTANDING (4 блок)
// -------------------------------------------------------------
let currentOutstanding = 1000;
const outstandingSum = document.querySelector(".outstanding-sum");

function updateOutstanding() {
  outstandingSum.textContent = currentOutstanding.toLocaleString();
  checkNextBtn();
}

document
  .querySelector(".outstanding__block-minus")
  .addEventListener("click", () => {
    currentOutstanding += 250;
    updateOutstanding();
  });

document
  .querySelector(".outstanding__block-plus")
  .addEventListener("click", () => {
    if (currentOutstanding > 0) currentOutstanding -= 250;
    updateOutstanding();
  });

updateOutstanding();

// -------------------------------------------------------------
//               CATEGORY (5 блок)
// -------------------------------------------------------------
document.querySelectorAll(".category").forEach(cat => {
  const img = cat.querySelector(".category__img");
  const text = cat.querySelector(".category__text");

  const original = img.src;
  const white = original.replace("/icons/", "/icons/white/");

  cat.addEventListener("click", () => {
    const active = cat.classList.toggle("active");
    img.src = active ? white : original;
    text.style.color = active ? "#fff" : "";
    cat.style.backgroundColor = active ? "#1EC756" : "";

    checkNextBtn();
  });
});

// -------------------------------------------------------------
//               MONTHLY (7 блок)
// -------------------------------------------------------------
let currentMonth = 12;
const monthlySum = document.querySelector(".monthly-sum");

function updateMonthly() {
  monthlySum.textContent = currentMonth;
  checkNextBtn();
}

document.querySelector(".monthly__block-minus").addEventListener("click", () => {
  let step = currentMonth < 12 ? 1 : 3;
  if (currentMonth + step <= 60) currentMonth += step;
  updateMonthly();
});

document.querySelector(".monthly__block-plus").addEventListener("click", () => {
  let step = currentMonth <= 12 ? 1 : 3;
  if (currentMonth - step >= 1) currentMonth -= step;
  updateMonthly();
});

updateMonthly();

// -------------------------------------------------------------
//               INPUT NAME LISTENER
// -------------------------------------------------------------
nameInput?.addEventListener("input", checkNextBtn);

function normalizeHeights() {
  let maxHeight = 0;

  mainContents.forEach(block => {
    block.style.display = "block"; // временно показать
    const h = block.offsetHeight;
    if (h > maxHeight) maxHeight = h;
    block.style.display = ""; // вернуть назад
  });

  mainContents.forEach(block => {
    block.style.minHeight = (maxHeight - 50) + "px";;
  });
}

normalizeHeights();
