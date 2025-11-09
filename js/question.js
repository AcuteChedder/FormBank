const nameInput = document.querySelector(".main__input");
const footerBtn = document.querySelector(".footer__btn");
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
  document.querySelector(".main__content-7"),
];

let currentIndex = 0;

const updateProgress = () => {
  const totalSteps = mainContents.length;
  const currentStep = currentIndex + 1;

  headerBar.style.background = `linear-gradient(to right, #FA6C12 ${
    (currentStep / totalSteps) * 100
  }%, #ededed ${(currentStep / totalSteps) * 100}%)`;

  mainContents.forEach((block) => {
    const page = block.querySelector(".main__page .current-page");
    if (page) {
      page.textContent = currentStep;
    }
  });
};

const showNextContent = () => {
  const currentBlock = mainContents[currentIndex];
  const input = currentBlock.querySelector("input");

  if (input && input.value.trim() === "") {
    console.log("Заполните поле");
    return;
  }

  currentBlock.style.display = "none";

  currentIndex++;

  if (currentIndex < mainContents.length) {
    mainContents[currentIndex].style.display = "block";

    if (currentIndex === mainContents.length - 1) {
      footerBtn.textContent = "Finish & Continue";
    }
  } else {
    header.style.display = "none";
    main.style.display = "none";
    connect.style.display = "flex";
    lastContent();
  }

  updateProgress();
};

const conectImg = document.querySelector(".connect-img");
const conectTitle = document.querySelector(".conntect__block-title");
const conectDesc = document.querySelector(".connect__block-desc");
const connectBtn = document.querySelector(".connect__btn");
const loader = document.querySelector(".loader")

const lastContent = () => {
  setTimeout(() => {
    conectImg.style.display = "block";
    loader.style.display = "none"
    conectImg.src = "./assets/link-success.png";
    conectTitle.innerHTML =
      'Link <span class="connect__span">€2800.00</span> Success';
    conectDesc.textContent = "Great work, your account is linked up";
    connectBtn.style.display = "block";
  }, 5000);
};

document.addEventListener("DOMContentLoaded", () => {
  const frames = ["Dot.svg", "Dot-1.svg", "Dot-2.svg", "Dot-3.svg", "Dot-4.svg"];

  const orangePoints = document.querySelectorAll(".orange__point");
  const purplePoints = document.querySelectorAll(".purple__point");

  let offset = 0

  setInterval(() => {
    orangePoints.forEach((point, index) => {
      const frameIndex = (index + offset) % frames.length;
      point.src = `./assets/orange/${frames[frameIndex]}`;
    })
    purplePoints.forEach((point, index) => {
      const frameIndex = (index + offset) % frames.length;
      point.src = `./assets/purple/${frames[frameIndex]}`;
    })

    offset = (offset + 1) % frames.length;
  }, 100);
});

footerBtn.addEventListener("click", showNextContent);

const backBtn = document.querySelector(".header__back");

backBtn.addEventListener("click", () => {
  if (currentIndex === 0) return;

  mainContents[currentIndex].style.display = "none";

  currentIndex--;

  mainContents[currentIndex].style.display = "block";

  if (currentIndex < mainContents.length - 1) {
    footerBtn.textContent = "Next";
  }
  updateProgress();
});

const purposeBlocks = document.querySelectorAll(".purpose__choose");

const purposeChoose = () => {
  purposeBlocks.forEach((block) => {
    const img = block.querySelector(".purpose__img");

    block.addEventListener("click", () => {
      if (block.classList.contains("active")) {
        block.classList.remove("active");
        img.src = "./assets/notChoose.svg";
      } else {
        block.classList.add("active");
        img.src = "./assets/Choose.svg";
      }
    });
  });
};

purposeChoose();

const plusBtn = document.querySelector(".amount__block-minus");
const minusBtn = document.querySelector(".amount__block-plus");
const amountSum = document.querySelector(".amount-sum");

let currentAmount = 10000;

const step = 250;

const updateAmount = () => {
  amountSum.textContent = currentAmount.toLocaleString();
};

plusBtn.addEventListener("click", () => {
  currentAmount += step;
  updateAmount();
});

minusBtn.addEventListener("click", () => {
  if (currentAmount - step >= 0) {
    currentAmount -= step;
    updateAmount();
  }
});

updateAmount();

const outstandingPlus = document.querySelector(".outstanding__block-minus");
const outstandingMinus = document.querySelector(".outstanding__block-plus");
const outstandingSum = document.querySelector(".outstanding-sum");

let currentOutstanding = 1000; //
const Yourstep = 250;

const updateOutstanding = () => {
  outstandingSum.textContent = currentOutstanding.toLocaleString();
};

outstandingPlus.addEventListener("click", () => {
  currentOutstanding += Yourstep;
  updateOutstanding();
});

outstandingMinus.addEventListener("click", () => {
  if (currentOutstanding - Yourstep >= 0) {
    currentOutstanding -= Yourstep;
    updateOutstanding();
  }
});

updateOutstanding();

const categories = document.querySelectorAll(".category");

categories.forEach((cat) => {
  const img = cat.querySelector(".category__img");
  const text = cat.querySelector(".category__text");

  const originalSrc = img.src;
  const whiteSrc = originalSrc.replace("/icons/", "/icons/white/");

  cat.addEventListener("click", () => {
    if (cat.classList.contains("active")) {
      cat.classList.remove("active");
      cat.style.backgroundColor = "";
      text.style.color = "";
      img.src = originalSrc;
    } else {
      cat.classList.add("active");
      cat.style.backgroundColor = "#1EC756";
      text.style.color = "#fff";
      img.src = whiteSrc;
    }
  });
});

const monthlyPlus = document.querySelector(".monthly__block-minus");
const monthlyMinus = document.querySelector(".monthly__block-plus");
const monthlySumEl = document.querySelector(".monthly-sum");

let currentMonth = 12;

const updateMonthly = () => {
  monthlySumEl.textContent = currentMonth;
};

monthlyPlus.addEventListener("click", () => {
  let step = currentMonth < 12 ? 1 : 3;

  if (currentMonth + step <= 60) {
    currentMonth += step;
    updateMonthly();
  }
});

monthlyMinus.addEventListener("click", () => {
  let step = currentMonth <= 12 ? 1 : 3;

  if (currentMonth - step >= 1) {
    currentMonth -= step;
    updateMonthly();
  }
});

updateMonthly();
