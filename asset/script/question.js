var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var submitted = false;
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("./data.json")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching data1:", error_1.message);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function markOption(optionsList, optionElement) {
    var markedOption = optionsList.querySelector(".marked");
    if (!submitted) {
        if (markedOption && markedOption !== optionElement) {
            markedOption.classList.remove("marked");
            markedOption.style.outline = "";
            var alphabetSpan_1 = markedOption.querySelector(".letter");
            if (alphabetSpan_1) {
                alphabetSpan_1.style.backgroundColor = ""; // Reset letter background color
            }
        }
        optionElement.style.outline = "2px solid rgba(167, 41, 245, 1)";
        optionElement.classList.add("marked");
        var alphabetSpan = optionElement.querySelector(".letter");
        if (alphabetSpan) {
            alphabetSpan.style.backgroundColor = "#8d00f2b6";
            alphabetSpan.style.color = "white";
        }
    }
}
function markAnswer(optionsList, correctAnswer) {
    var score = 0;
    optionsList.querySelectorAll("li").forEach(function (option) {
        var _a;
        var alphabetSpan = option.querySelector(".letter");
        var listItem = option;
        var crossIcon = document.createElement("span");
        crossIcon.innerHTML = '<i class="fas fa-times"></i>';
        crossIcon.className = "crossIcon";
        var tickIcon = document.createElement("span");
        tickIcon.innerHTML = '<i class="fas fa-check"></i>';
        tickIcon.className = "tickIcon";
        if ((_a = option.textContent) === null || _a === void 0 ? void 0 : _a.endsWith(correctAnswer)) {
            if (option.classList.contains("marked")) {
                option.classList.add("correct");
                option.style.outline = "2px solid green";
                alphabetSpan.style.backgroundColor = "green";
                alphabetSpan.style.color = "white";
                listItem.appendChild(tickIcon);
                score += 1;
            }
            else {
                option.classList.add("correct");
                listItem.appendChild(tickIcon);
            }
        }
        else if (option.classList.contains("marked")) {
            listItem.appendChild(crossIcon);
            option.style.outline = "2px solid red";
            option.classList.add("wrong");
            alphabetSpan.style.backgroundColor = "red";
            alphabetSpan.style.color = "white";
        }
    });
    return score;
}
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    function updateProgressBar() {
        var progressPercentage = (currentQuestionIndex_1 / filteredData_1[0].questions.length) * 100;
        progressBar_1.style.width = "".concat(progressPercentage, "%");
    }
    function displayCurrentQuestion() {
        questionListContainer_1.innerHTML = "";
        var currentQuestion = filteredData_1[0].questions[currentQuestionIndex_1];
        var listItem = document.createElement("div");
        listItem.classList.add("list-item");
        var leftContainer = document.createElement("div");
        leftContainer.classList.add("left-container");
        var questionNumber = document.createElement("p");
        questionNumber.classList.add("question");
        questionNumber.textContent = "Question ".concat(currentQuestionIndex_1 + 1, " of ").concat(filteredData_1[0].questions.length);
        var questionText = document.createElement("h1");
        questionText.innerHTML = currentQuestion.question;
        questionText.className = "question-title";
        leftContainer.appendChild(questionNumber);
        leftContainer.appendChild(questionText);
        var optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options-container");
        var optionsList = document.createElement("ul");
        optionsList.classList.add("options-list");
        currentQuestion.options.forEach(function (option, index) {
            var listItem = document.createElement("li");
            listItem.className = "li";
            var alphabetSpan = document.createElement("span");
            alphabetSpan.textContent = String.fromCharCode(65 + index);
            alphabetSpan.className = "letter";
            var optionText = document.createElement("span");
            optionText.textContent = option;
            listItem.appendChild(alphabetSpan);
            listItem.appendChild(optionText);
            listItem.addEventListener("click", function () {
                if (!listItem.classList.contains("marked")) {
                    markOption(optionsList, listItem);
                }
            });
            optionsList.appendChild(listItem);
        });
        var submitButton = document.createElement("button");
        submitButton.className = "submit";
        submitButton.textContent = "Submit Answer";
        submitButton.addEventListener("click", function () {
            var markedOption = optionsList.querySelector(".marked");
            var existingErrorMessage = optionsContainer.querySelector(".error-message");
            if (!markedOption && !existingErrorMessage) {
                submitted = false;
                // Create and append an error message element
                var errorMessage = document.createElement("p");
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
                submitted = true;
                totalScore_1 += markAnswer(optionsList, currentQuestion.answer);
                submitButton.style.display = "none";
                optionsList.querySelectorAll("li").forEach(function (option) {
                    option.removeEventListener("click", optionClickHandler);
                });
                nextButton.style.display = "block";
            }
        });
        var nextButton = document.createElement("button");
        nextButton.textContent = "Next Question";
        nextButton.style.display = "none";
        nextButton.className = "nextButton";
        // Inside the click event listener for the "Next Question" button
        nextButton.addEventListener("click", function () {
            submitted = false;
            optionsList.querySelectorAll("li").forEach(function (option) {
                option.style.outline = "";
                option.classList.remove("marked", "correct", "wrong");
            });
            nextButton.style.display = "none";
            optionsList.querySelectorAll("li").forEach(function (option) {
                option.addEventListener("click", optionClickHandler);
            });
            currentQuestionIndex_1++;
            if (currentQuestionIndex_1 < filteredData_1[0].questions.length) {
                displayCurrentQuestion();
                // Store the current question index in sessionStorage
                sessionStorage.setItem("currentQuestionIndex", currentQuestionIndex_1.toString());
            }
            else {
                // Hide the progress bar when questions are done
                document.getElementById("progress-bar-container").style.display =
                    "none";
                // Create a new container for the score page
                var scorePageContainer = document.createElement("div");
                scorePageContainer.classList.add("score-flex");
                // Left container for the score content
                var scoreLeftContainer = document.createElement("div");
                scoreLeftContainer.classList.add("score-left-container");
                scoreLeftContainer.innerHTML = "\n  <span class=\"completed\">Quiz completed</span><br>\n  <span class=\"score\">You Scored.. </span>\n";
                // Right container for the score content
                var scoreRightContainer = document.createElement("div");
                scoreRightContainer.classList.add("score-right-container");
                scoreRightContainer.innerHTML = "\n<div class=\"score-board\">\n<span class=\"header\">\n    <img style=\"background-color: ".concat(filteredData_1[0].color, ";\" src=\"").concat(imageUrl_1, "\" />\n    <span>").concat(typeParam_1, "</span>\n</span>\n<span class=\"digit\">").concat(totalScore_1, " </span>\n<p class=\"out\">out of ").concat(filteredData_1[0].questions.length, "</p>\n</div>\n\n  <a href=\"/\"><button class=\"againBtn\">Play Again</button></a>\n");
                // Append the left and right containers to the score page container
                scorePageContainer.appendChild(scoreLeftContainer);
                scorePageContainer.appendChild(scoreRightContainer);
                // Replace the content of the questionListContainer with the score page container
                questionListContainer_1.innerHTML = "";
                var existingFlexContainer = document.querySelector(".container");
                existingFlexContainer.appendChild(scorePageContainer);
                // Inside the "Play Again" button click event listener
                var againBtn = document.querySelector(".againBtn");
                againBtn.addEventListener("click", function () {
                    // Clear stored data
                    sessionStorage.removeItem("currentQuestionIndex");
                    localStorage.removeItem("quizCompleted");
                    window.location.href = "/";
                    // Reset variables and start the quiz again
                    currentQuestionIndex_1 = 0;
                    totalScore_1 = 0;
                    quizCompleted_1 = false;
                });
            }
        });
        optionsContainer.appendChild(optionsList);
        optionsContainer.appendChild(submitButton);
        optionsContainer.appendChild(nextButton);
        questionListContainer_1.appendChild(optionsContainer);
        questionListContainer_1.appendChild(leftContainer);
        updateProgressBar();
        function optionClickHandler(event) {
            event.preventDefault();
            var isAlreadyMarked = this.classList.contains("marked");
            if (!isAlreadyMarked) {
                markOption(optionsList, this);
            }
        }
        optionsList.querySelectorAll("li").forEach(function (option) {
            option.addEventListener("click", optionClickHandler);
        });
    }
    var currentUrl, urlParams, questionListContainer_1, progressBar_1, typeParam_1, headTitle, totalScore_1, currentQuestionIndex_1, storedQuestionIndex, quizCompleted_1, storedQuizCompleted, data, filteredData_1, imageUrl_1, headImg, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                currentUrl = window.location.href;
                urlParams = new URLSearchParams(new URL(currentUrl).search);
                questionListContainer_1 = document.getElementById("question-list");
                progressBar_1 = document.getElementById("progress-bar");
                typeParam_1 = urlParams.get("type");
                headTitle = document.getElementById("title");
                headTitle.textContent = typeParam_1;
                totalScore_1 = 0;
                currentQuestionIndex_1 = 0;
                storedQuestionIndex = sessionStorage.getItem("currentQuestionIndex");
                quizCompleted_1 = false;
                storedQuizCompleted = localStorage.getItem("quizCompleted");
                if (storedQuestionIndex) {
                    currentQuestionIndex_1 = parseInt(storedQuestionIndex, 10);
                }
                if (!questionListContainer_1) return [3 /*break*/, 2];
                return [4 /*yield*/, fetchData()];
            case 1:
                data = _a.sent();
                filteredData_1 = data.quizzes.filter(function (item) { return item.title === typeParam_1; });
                if (filteredData_1.length > 0) {
                    imageUrl_1 = filteredData_1[0].icon;
                    headImg = document.getElementById("head_img");
                    if (headImg && imageUrl_1) {
                        headImg.src = imageUrl_1;
                        headImg.style.backgroundColor = filteredData_1[0].color;
                    }
                    displayCurrentQuestion();
                }
                else {
                    console.error("No quiz found with the specified type.");
                    window.location.href = "/";
                }
                return [3 /*break*/, 3];
            case 2:
                console.error('Container element with id "question-list" not found.');
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
var toggleSwitch = document.getElementById("toggleSwitch");
toggleSwitch.addEventListener("change", function () {
    var mode = toggleSwitch.checked ? "#f4f6fA" : "black";
    localStorage.setItem("mode", mode);
    toggleDarkModeStyles(mode);
});
window.addEventListener("load", function () {
    var storedMode = localStorage.getItem("mode");
    if (storedMode) {
        toggleDarkModeStyles(storedMode);
        toggleSwitch.checked = storedMode === "#f4f6fA";
    }
});
function toggleDarkModeStyles(mode) {
    var slider = document.querySelector(".slider");
    var body = document.body;
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
function updateListItems(mode) {
    var listItems = document.querySelectorAll(".options-list li");
    listItems.forEach(function (item) {
        item.style.color = mode === "#f4f6fA" ? "#ffffff" : "#313e51";
        item.style.backgroundColor = mode === "#f4f6fA" ? "#3B4D66" : "#F4F6FA";
    });
}
