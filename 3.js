const questions = [
    {
        fullText: "אריה יושב מתחת לעץ בגן-חיות",
        answers: ["אריה", "יושב", "מתחת", "לעץ", "בגן חיות"], // "גן חיות" כערך אחד
        image: "image1.JPEG",
    },
    {
        fullText: "אבטיח גדול מונח על שולחן פיקניק",
        answers: ["אבטיח", "גדול", "מונח", "על", "שולחן", "פיקניק"],
        image: "image2.jpg",
    },
    {
        fullText: "שכחתי את הארנק בבית ולא יכולתי לשלם בחנות.",
        answers: ["שכחתי", "את", "הארנק", "בבית", "ולא", "יכולתי", "לשלם", "בחנות"],
        image: "image3.jpg", // הכנס את התמונה המתאימה
    },
    {
        fullText: "האדנית במרפסת מלאה בפרחים צבעוניים שמאירים את הבוקר.",
        answers: ["האדנית", "במרפסת", "מלאה", "בפרחים", "צבעוניים", "שמאירים", "את", "הבוקר"],
        image: "image5.JPEG", // הכנס את התמונה המתאימה
    },
    {
        fullText: "היא מנגנת על אורגנית.",
        answers: ["היא", "מנגנת", "על", "אורגנית"],
        image: "image4.WEBP", // הכנס את התמונה המתאימה
    }
];

let currentQuestionIndex = 0;
let currentAnswerIndex = 0;

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const questionText = question.fullText.split(" ").map(word => word.trim()).filter(Boolean);  // לחלק את הטקסט למילים
    
    const htmlQuestion = questionText.map((word, index) => {
        if (index === currentAnswerIndex) {
            return `<input type="text" id="answer" placeholder="Type here">`;
        } else {
            return word;
        }
    }).join(" ");
    
    // הצגת השאלה וחשב את תמונה
    document.querySelector(".question").innerHTML = htmlQuestion;
    document.querySelector(".image-container img").src = question.image;
    document.querySelector(".image-container img").style.display = "block";
    document.getElementById("answer").focus();
    document.getElementById("answer").addEventListener("input", checkAnswer);
}

function checkAnswer() {
    const answerField = document.getElementById("answer");
    if (!answerField) return;

    const correctAnswer = questions[currentQuestionIndex].answers[currentAnswerIndex];
    
    if (answerField.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        showClappingGif();
        currentAnswerIndex++;
        
        if (currentAnswerIndex < questions[currentQuestionIndex].answers.length) {
            setTimeout(displayQuestion, 2000);
        } else {
            currentQuestionIndex++;
            currentAnswerIndex = 0;
            if (currentQuestionIndex < questions.length) {
                setTimeout(displayQuestion, 2000);
            } else {
                setTimeout(() => {
                    alert("Well done! you have completed all the questions!");
                    showRestartButton();
                }, 2000);
            }
        }
    } else if (answerField.value.length >= correctAnswer.length) {
        setTimeout(() => {
            alert(`The correct word is : ${correctAnswer}`);
            answerField.value = correctAnswer;
            currentAnswerIndex++;
            
            if (currentAnswerIndex < questions[currentQuestionIndex].answers.length) {
                setTimeout(displayQuestion, 2000);
            } else {
                currentQuestionIndex++;
                currentAnswerIndex = 0;
                if (currentQuestionIndex < questions.length) {
                    setTimeout(displayQuestion, 2000);
                } else {
                    setTimeout(() => {
                        alert("Well done! you have completed all the questions!");
                        showRestartButton();
                    }, 2000);
                }
            }
        }, 1000);
    }
}

function showClappingGif() {
    const gifContainer = document.querySelector(".gif-container");
    gifContainer.innerHTML = `<img src="Clapping.webp" alt="Applause">`;
    setTimeout(() => {
        gifContainer.innerHTML = "";
    }, 2000);
}
// פונקציה להציג את כפתור ה-Restart
function showRestartButton() {
    const restartContainer = document.querySelector(".restart-container");
    restartContainer.innerHTML = ""; // למחוק כפתור קודם אם קיים
    
    const restartButton = document.createElement("button");
    restartButton.innerText = "Restart";
    restartButton.classList.add("restart-btn");
    restartButton.addEventListener("click", restartGame);
    
    restartContainer.appendChild(restartButton);
}

// פונקציה לאתחול המשחק מחדש
function restartGame() {
    currentQuestionIndex = 0;
    currentAnswerIndex = 0;
    document.querySelector(".restart-container").innerHTML = ""; // להסיר את הכפתור
    displayQuestion(); // להתחיל מחדש
}

// להציג את השאלה הראשונה כשהעמוד נטען
window.onload = function () {
    displayQuestion();
};
window.onload = function () {
    displayQuestion();
};