import { jsPDF } from "jspdf";
import { quizData } from "./quizData.js";

export function showResult(
  quizSection,
  resultSection,
  resultText,
  userAnswers
) {
  quizSection.style.display = "none";
  resultSection.style.display = "block";
  resultText.textContent = "Congratulations! You've completed the quiz.";

  // Add introductory text
  const introText = document.createElement("p");
  introText.textContent = "Here are your results:";
  introText.style.fontSize = "18px";
  introText.style.marginBottom = "20px";
  resultSection.appendChild(introText);

  // Clear previous results
  const resultList = document.createElement("ul");
  resultList.innerHTML = ""; // Clear any existing content

  quizData.forEach((item, index) => {
    const listItem = document.createElement("li");

    // Bigger font size for the question
    listItem.innerHTML = `<strong style="font-size: 16px;">${index + 1}. ${
      item.question
    }</strong>`;

    const userAnswer = userAnswers[index] || "No answer selected";
    const correctAnswer = item.answer;

    // Color coding answers
    listItem.innerHTML += `<br>Your Answer: <span style="color: red;">${userAnswer}</span>`;
    listItem.innerHTML += `<br>Correct Answer: <span style="color: green;">${correctAnswer}</span>`;

    resultList.appendChild(listItem);
  });

  resultSection.appendChild(resultList);
}

export function downloadPDF(userAnswers) {
  const doc = new jsPDF();
  doc.setFontSize(24);
  doc.setTextColor("#8259ff");
  doc.text("OMR Education Quiz Result", 10, 10);

  quizData.forEach((item, index) => {
    const yOffset = 30 + index * 40;
    doc.setFontSize(14);
    doc.setTextColor("#000000");
    doc.text(`${index + 1}. ${item.question}`, 10, yOffset);

    doc.setFontSize(12);

    // User's answer
    const userAnswer = userAnswers[index] || "No answer selected";
    doc.setTextColor("#ff0000"); // Red for user's answer
    doc.text(`Your Answer: ${userAnswer}`, 10, yOffset + 10);

    // Correct answer
    doc.setTextColor("#00ff00"); // Green for correct answer
    doc.text(`Correct Answer: ${item.answer}`, 10, yOffset + 20);
  });

  doc.save("quiz-result.pdf");
}
