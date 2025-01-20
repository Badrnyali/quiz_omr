import { showResult, downloadPDF } from "./resultHandler.js";
import { quizData } from "./quizData.js";

let currentQuestion = 0;
const userAnswers = []; // Array to store user answers
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const resultText = document.getElementById("result-text");
const emailForm = document.getElementById("email-form");

function loadQuestion() {
  const questionData = quizData[currentQuestion];
  quizSection.innerHTML = `
        <h2>${questionData.question}</h2>
        <div class="options">
        ${questionData.options
          .map(
            (option) => `
            <button class="option-button">${option}</button>
            `
          )
          .join("")}
        </div>
    `;

  document.querySelectorAll(".option-button").forEach((button) => {
    button.addEventListener("click", () => {
      userAnswers[currentQuestion] = button.textContent; // Store the user's answer
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        // Show results when all questions have been answered
        showResult(quizSection, resultSection, resultText, userAnswers);
      }
    });
  });
}

document.querySelector(".pdf-button").addEventListener("click", () => {
  downloadPDF(userAnswers); // Pass userAnswers to downloadPDF
});

emailForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = emailForm.querySelector('input[type="email"]').value;
  alert(`Results sent to ${email}`);
});

document.getElementById("logo").addEventListener("click", () => {
  currentQuestion = 0;
  document.getElementById("intro").style.display = "block";
  quizSection.style.display = "none";
  resultSection.style.display = "none";
});

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("intro").style.display = "none";
  quizSection.style.display = "block";
  loadQuestion();
});

// New event listener for "Get Results"
document.getElementById("get-results-button").addEventListener("click", () => {
  showResult(quizSection, resultSection, resultText, userAnswers);
});

loadQuestion();
