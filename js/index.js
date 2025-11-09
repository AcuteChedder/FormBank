const eye1 = document.getElementById("eye-1");
const eye2 = document.getElementById("eye-2");

const input1 = document.getElementById("input-1");
const input2 = document.getElementById("input-2");

eye1.addEventListener("click", () => {
  input1.type = input1.type === "password" ? "text" : "password";
});

eye2.addEventListener("click", () => {
  input2.type = input2.type === "password" ? "text" : "password";
});

const form = document.querySelector(".form");
const emailInput = document.querySelector('input[placeholder="Email"]');
const password1 = document.getElementById("input-1");
const password2 = document.getElementById("input-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const pass1 = password1.value.trim();
  const pass2 = password2.value.trim();

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailReg.test(email)) {
    console.log("Введите корректный email.");
    return;
  }

  if (pass1 === "" || pass2 === "") {
    console.log("Заполните оба парольных поля.");
    return;
  }

  if (pass1 !== pass2) {
    console.log("Пароли не совпадают.");
    return;
  }

  window.location.href = "question.html";
});

const blockInputs = document.querySelectorAll(".form__el");
const key1 = document.getElementById("key-1");
const key2 = document.getElementById("key-2");
const key3 = document.getElementById("key-3");

blockInputs.forEach((block) => {
  block.addEventListener("click", () => {

    blockInputs.forEach(b => {
      b.classList.remove("active");
      const img = b.querySelector(".input-img");

      if (img.src.includes("mail-orange")) {
        img.src = "./assets/mail.svg";
      } else if (img.src.includes("key-orange")) {
        img.src = "./assets/key.svg";
      }
    });

    const img = block.querySelector(".input-img");
    const src = img.src;

    if (src.includes("mail.svg")) {
      img.src = "./assets/mail-orange.svg";
      block.classList.add('active')
    } else if (src.includes("key.svg")) {
      img.src = "./assets/key-orange.svg";
      block.classList.add('active')
    }
  });
});
