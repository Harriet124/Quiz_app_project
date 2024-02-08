interface ApiResponse1 {
  quizzes: quizzes[];
}

interface quizzes {
  title: string;
  icon: string;
  color: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
  backgroundColor: string;
}

async function fetchData(): Promise<ApiResponse1> {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ApiResponse1 = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data1:", error.message);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(new URL(currentUrl).search);
    const questionListContainer = document.getElementById("question-list")!;
    const progressBar = document.getElementById("progress-bar")!;
    const typeParam = urlParams.get("type");
    const headTitle = document.getElementById("title");
    headTitle!.textContent = typeParam;
    let totalScore = 0;
    let currentQuestionIndex = 0;
     // Check if there is a stored question index in sessionStorage
     const storedQuestionIndex = sessionStorage.getItem("currentQuestionIndex");
     let quizCompleted = false;

    // Check if the quiz has been completed in localStorage
    const storedQuizCompleted = localStorage.getItem("quizCompleted");


     if (storedQuestionIndex) {
       currentQuestionIndex = parseInt(storedQuestionIndex, 10);
     }

    if (questionListContainer) {
      const data: ApiResponse1 = await fetchData();
      const filteredData = data.quizzes.filter(
        (item) => item.title === typeParam
      );

      if (filteredData.length > 0) {
        const imageUrl = filteredData[0].icon;
        const headImg = document.getElementById("head_img") as HTMLImageElement;

        function updateProgressBar() {
          const progressPercentage =
            (currentQuestionIndex / filteredData[0].questions.length) * 100;
          progressBar.style.width = `${progressPercentage}%`;
        }

        if (headImg && imageUrl) {
          headImg.src = imageUrl;
          headImg.style.backgroundColor = filteredData[0].color;
        }

        function displayCurrentQuestion() {
          questionListContainer.innerHTML = "";

          const currentQuestion =
            filteredData[0].questions[currentQuestionIndex];

          const listItem = document.createElement("div");
          listItem.classList.add("list-item");

          const leftContainer = document.createElement("div");
          leftContainer.classList.add("left-container");
          

          const questionNumber = document.createElement("p");
          questionNumber.classList.add("question");
          questionNumber.textContent = `Question ${
            currentQuestionIndex + 1
          } of ${filteredData[0].questions.length}`;

          const questionText = document.createElement("h1");
          questionText.innerHTML = currentQuestion.question;
          questionText.style.wordWrap = "break-word"; // Add this line for word wrapping
          questionText.style.maxWidth = "700px"; // Set the maximum width as needed

          leftContainer.appendChild(questionNumber);
          leftContainer.appendChild(questionText);

          const optionsContainer = document.createElement("div");
          optionsContainer.classList.add("options-container");

          const optionsList = document.createElement("ul");
          optionsList.classList.add("options-list");

          currentQuestion.options.forEach((option, index) => {
            const listItem = document.createElement("li") as HTMLElement;
            listItem.className='li';

            const alphabetSpan = document.createElement("span");
            alphabetSpan.textContent = String.fromCharCode(65 + index);
            alphabetSpan.className = "letter";

            const optionText = document.createElement("span");
            optionText.textContent = option;

            listItem.appendChild(alphabetSpan);
            listItem.appendChild(optionText);

            listItem.addEventListener("click", () => {
              if (!listItem.classList.contains("marked")) {
                markOption(optionsList, listItem);
              }
            });

            optionsList.appendChild(listItem);
          });

          const submitButton = document.createElement("button");
          submitButton.className = "submit";
          submitButton.textContent = "Submit Answer";
          submitButton.addEventListener("click", () => {
            const markedOption = optionsList.querySelector(
              ".marked"
            ) as HTMLElement;

            const existingErrorMessage =
              optionsContainer.querySelector(".error-message");
            if (!markedOption && !existingErrorMessage) {
              // Create and append an error message element
              const errorMessage = document.createElement("p");
              errorMessage.innerHTML =
                '<i class="cross fas fa-times"></i>' +
                " Please select an option before submitting.";
              errorMessage.className = "error-message";

              optionsContainer.appendChild(errorMessage);

              errorMessage.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }

            if (markedOption) {
              totalScore += markAnswer(optionsList, currentQuestion.answer);

              submitButton.style.display = "none";

              optionsList.querySelectorAll("li").forEach((option) => {
                option.removeEventListener("click", optionClickHandler);
              });

              nextButton.style.display = "block";
            }
          });

          const nextButton = document.createElement("button");
          nextButton.textContent = "Next Question";
          nextButton.style.display = "none";
          nextButton.className = "nextButton";
          // Inside the click event listener for the "Next Question" button
          nextButton.addEventListener("click", () => {
            optionsList.querySelectorAll("li").forEach((option) => {
              option.style.outline = "";
              option.classList.remove("marked", "correct", "wrong");
            });

            nextButton.style.display = "none";

            optionsList.querySelectorAll("li").forEach((option) => {
              option.addEventListener("click", optionClickHandler);
            });

            currentQuestionIndex++;

            if (currentQuestionIndex < filteredData[0].questions.length) {
              displayCurrentQuestion();
               // Store the current question index in sessionStorage
        sessionStorage.setItem(
          "currentQuestionIndex",
          currentQuestionIndex.toString()
        );
            } else {
              // Hide the progress bar when questions are done
document.getElementById("progress-bar-container")!.style.display = "none";

questionListContainer.innerHTML = `
  <div class="score-parent-container">
    <div class="score-left-container">
      <span class="completed">Quiz completed</span><br><span class="score">You Scored.. </span>
    </div>

    <div class="score-right-container">
      <div class="score-board">
        <span class="header"><span>${typeParam}</span><img src="${imageUrl}" /></span>
        <span class="digit">${totalScore}</span>
        <span>out of ${filteredData[0].questions.length}</span>
      </div>
      <button class="againBtn">Play Again</button>
    </div>
  </div>`;

// Inside the "Play Again" button click event listener
const againBtn = document.querySelector(".againBtn");
againBtn.addEventListener("click", () => {
  window.location='/';

  // Reset variables and start the quiz again
  currentQuestionIndex = 0;
  totalScore = 0;
  quizCompleted = false;

  displayCurrentQuestion();
});

            
            }
          });

          optionsContainer.appendChild(optionsList);
          optionsContainer.appendChild(submitButton);
          optionsContainer.appendChild(nextButton);

          questionListContainer.appendChild(optionsContainer);

          questionListContainer.appendChild(leftContainer);

          updateProgressBar();

          function optionClickHandler(event) {
            event.preventDefault();
            const isAlreadyMarked = this.classList.contains("marked");

            if (!isAlreadyMarked) {
              markOption(optionsList, this);
            }
          }

          optionsList.querySelectorAll("li").forEach((option) => {
            option.addEventListener("click", optionClickHandler);
          });
        }

        displayCurrentQuestion();
      } else {
        console.error("No quiz found with the specified type.");
        window.location.href = "/";
      }
    } else {
      console.error('Container element with id "question-list" not found.');
    }
  } catch (e) {
    console.log(e);
  }
});

function markOption(optionsList: HTMLUListElement, optionElement: HTMLElement) {
  const markedOption = optionsList.querySelector(".marked") as HTMLElement;

  if (markedOption || optionElement.classList.contains("marked")) {
    markedOption.classList.remove("marked");
    markedOption.style.outline = "";

    const alphabetSpan = markedOption.querySelector(".letter") as HTMLElement;
    alphabetSpan.style.backgroundColor = ""; // Reset letter background color
  }

  optionElement.style.outline = "2px solid rgba(167, 41, 245, 1)";
  optionElement.classList.add("marked");

  const alphabetSpan = optionElement.querySelector(".letter") as HTMLElement;
  alphabetSpan.style.backgroundColor = "#8d00f2b6";
  alphabetSpan.style.color='white';
}

function markAnswer(
  optionsList: HTMLUListElement,
  correctAnswer: string
): number {
  let score = 0;

  optionsList.querySelectorAll("li").forEach((option) => {
    const alphabetSpan = option.querySelector(".letter") as HTMLElement;
    const listItem = option as HTMLLIElement;
    const crossIcon = document.createElement("span");
    crossIcon.innerHTML = '<i class="fas fa-times"></i>';
    crossIcon.className = "crossIcon";
    const tickIcon = document.createElement("span");
    tickIcon.innerHTML = '<i class="fas fa-check"></i>';
    tickIcon.className = "tickIcon";

    if (option.textContent?.endsWith(correctAnswer)) {
      if (option.classList.contains("marked")) {
        option.classList.add("correct");
        option.style.outline = "2px solid green";
        alphabetSpan.style.backgroundColor = "green";
        alphabetSpan.style.color = "white";
        listItem.appendChild(tickIcon);

        score += 1;
      } else {
        option.classList.add("correct");
        listItem.appendChild(tickIcon);
      }
    } else if (option.classList.contains("marked")) {
      listItem.appendChild(crossIcon);
      option.style.outline = "2px solid red";
      option.classList.add("wrong");
      alphabetSpan.style.backgroundColor = "red";
      alphabetSpan.style.color = "white";
    }
  });

  return score;
}

const toggleSwitch = document.getElementById(
  "toggleSwitch"
) as HTMLInputElement;

const storedMode = localStorage.getItem("mode");

if (storedMode) {
  const slider = document.querySelector(".slider") as HTMLElement;
  toggleDarkModeStyles(storedMode);
  toggleSwitch.checked = storedMode === "#f4f6fA";
}

toggleSwitch.addEventListener("change", () => {
  const mode = toggleSwitch.checked ? "#f4f6fA" : "black";
  localStorage.setItem("mode", mode);

  toggleDarkModeStyles(mode);
});

window.addEventListener("load", () => {
  const storedMode = localStorage.getItem("mode");
  if (storedMode) {
    toggleDarkModeStyles(storedMode);
    toggleSwitch.checked = storedMode === "#f4f6fA";
  }
});

function toggleDarkModeStyles(mode: string) {
  const slider = document.querySelector(".slider") as HTMLElement;
  const body = document.body;

  slider.style.backgroundColor =
    mode === "#f4f6fA" ? "rgba(167, 41, 245, 0.8)" : "rgba(167, 41, 245, 0.8)";
  body.style.color = mode === "#f4f6fA" ? "#ffffff" : "#313e51";
  body.style.backgroundColor = mode === "#f4f6fA" ? "#313E51" : "#F4F6FA";
  body.style.backgroundImage =
    mode === "#f4f6fA"
      ? 'url("/images/pattern-background-desktop-dark.svg")'
      : 'url("/images/pattern-background-desktop-light.svg")';

  updateListItems(mode);
}

function updateListItems(mode: string) {
  const listItems = document.querySelectorAll(
    ".options-list li"
  ) as NodeListOf<HTMLElement>;
  listItems.forEach((item) => {
    item.style.color = mode === "#f4f6fA" ? "#ffffff" : "#313e51";
    item.style.backgroundColor = mode === "#f4f6fA" ? "#3B4D66" : "#F4F6FA";
  });
}
