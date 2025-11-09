document.addEventListener("DOMContentLoaded", () => {
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
  const emailInput = form.querySelector('input[placeholder="Email"]');
  const password1 = document.getElementById("input-1");
  const password2 = document.getElementById("input-2");

  const emailError = form.querySelector(".error-email"); 
  const passError = form.querySelector(".error-pass");   

  const submitBtn = form.querySelector(".form__btn");
  submitBtn.disabled = true;

  function validateForm() {
    const email = emailInput.value.trim();
    const pass1 = password1.value.trim();
    const pass2 = password2.value.trim();

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!emailReg.test(email)) {
      emailError.textContent = "Введите верную почту";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    if (pass1 === "" || pass2 === "") {
      valid = false;
    }

    if (pass1 !== pass2) {
      passError.textContent = "Пароли не совпадают";
      valid = false;
    } else {
      passError.textContent = "";
    }

    submitBtn.disabled = !valid; 
  }

  emailInput.addEventListener("input", validateForm);
  password1.addEventListener("input", validateForm);
  password2.addEventListener("input", validateForm);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!submitBtn.disabled) {
      window.location.href = "question.html";
    }
  });

  const blockInputs = document.querySelectorAll(".form__el");
  blockInputs.forEach((block) => {
    block.addEventListener("click", () => {
      blockInputs.forEach((b) => {
        b.classList.remove("active");
        const img = b.querySelector(".input-img");
        if (img.src.includes("mail-orange")) img.src = "./assets/mail.svg";
        if (img.src.includes("key-orange")) img.src = "./assets/key.svg";
      });

      const img = block.querySelector(".input-img");
      if (img.src.includes("mail.svg")) {
        img.src = "./assets/mail-orange.svg";
        block.classList.add("active");
      }
      if (img.src.includes("key.svg")) {
        img.src = "./assets/key-orange.svg";
        block.classList.add("active");
      }
    });
  });
});
