interface ApiResponse1 {
  quizzes: quizzes[];
}

interface quizzes {
  title: string;
  ratio: string;
  icon: string;
  color: string;
}

// Function to make a Fetch API call for Interface 1
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

fetchData();
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch data from the API
    const data: ApiResponse1 = await fetchData();

    console.log(data);

    // Get the container where you want to display the options
    const optionsContainer = document.getElementById("navigation");

    // Check if the container exists
    if (optionsContainer) {
      // Clear existing content
      optionsContainer.innerHTML = "";

      // Iterate over the options and append them to the container
      data.quizzes.forEach((option) => {
        const listItem = document.createElement("li");
        listItem.className = "image-item";

        // Create the elements for option letter and content
        const title = document.createElement("h1");
        title.className = "content";
        title.textContent = option.title;

        // Add click event listener to the title
        listItem.addEventListener("click", function () {
          // Pass the stored mode to the question page
          window.location.href = `/question.html?type=${option.title}&mode=${storedMode}`;
        });

        const img = document.createElement("img");
        img.className = "questionimage";
        img.src = option.icon;
        // img.style.backgroundColor = option.color;

        console.log(option.color);

        // Append elements to the list item
        listItem.appendChild(img);
        listItem.appendChild(title);

        // Append the list item to the options container
        optionsContainer.appendChild(listItem);
      });
    }
  } catch (e) {
    console.log(e);
  }
});

const toggleSwitch = document.getElementById(
  "toggleSwitch"
) as HTMLInputElement;

// Retrieve the stored background color mode from localStorage
const storedMode = localStorage.getItem("mode");

// Set initial background color based on the stored value
if (storedMode) {
  const slider = document.querySelector(".slider") as HTMLElement;
  toggleDarkModeStyles(storedMode); // Apply initial styles based on stored mode
  toggleSwitch.checked = storedMode === "#f4f6fA";
}

// Toggle switch on/off functionality
toggleSwitch.addEventListener("change", () => {
  const mode = toggleSwitch.checked ? "#f4f6fA" : "black";
  localStorage.setItem("mode", mode);

  toggleDarkModeStyles(mode); // Apply styles based on the new mode
});

// Handle page refresh
window.addEventListener("load", () => {
  const storedMode = localStorage.getItem("mode");
  if (storedMode) {
    toggleDarkModeStyles(storedMode); // Apply styles based on the stored mode
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

  // Update the list items with the new mode
  updateListItems(mode);
}

function updateListItems(mode: string) {
  // Update the list items with the stored mode
  const listItems = document.querySelectorAll(
    ".image-item"
  ) as NodeListOf<HTMLElement>;
  listItems.forEach((item) => {
    item.style.color = mode === "#f4f6fA" ? "#ffffff" : "#313e51";
    item.style.backgroundColor = mode === "#f4f6fA" ? "#313E51" : "#F4F6FA";
  });
}
