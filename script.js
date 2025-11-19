const foodForm = document.getElementById("foodForm");
const foodNameInput = document.getElementById("foodName");
const foodCaloriesInput = document.getElementById("foodCalories");
const foodList = document.getElementById("foodList");
const totalCaloriesDisplay = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");
const darkModeToggle = document.getElementById("darkModeToggle");

let foods = JSON.parse(localStorage.getItem("foods")) || [];
let darkMode = localStorage.getItem("darkMode") === "enabled";

if (darkMode) document.body.classList.add("dark");

function renderFoods() {
  foodList.innerHTML = "";
  let total = 0;

  foods.forEach((item, index) => {
    total += item.calories;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} - ${item.calories} kcal</span>
      <button onclick="removeFood(${index})" class="reset-btn" style="padding:4px 10px;">
        Remove
      </button>
    `;
    foodList.appendChild(li);
  });

  totalCaloriesDisplay.textContent = total;
}

async function fetchCalories(foodName) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const manual = Number(foodCaloriesInput.value);
  if (manual > 0) return manual;

  const fakeData = {
    apple: 95,
    banana: 110,
    rice: 206,
    bread: 79,
  };

  return fakeData[foodName.toLowerCase()] || 100;
}

foodForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = foodNameInput.value.trim();
  const calories = await fetchCalories(name);

  foods.push({ name, calories });

  localStorage.setItem("foods", JSON.stringify(foods));
  renderFoods();
  foodForm.reset();
});