const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const recipeGrid = document.getElementById("recipeGrid");

// Loader element
const loader = document.createElement("div");
loader.classList.add("loader");
loader.innerText = "Loading recipes... 🍳";

async function searchRecipe() {
  const input = searchInput.value.trim();

  if (input === "") {
    recipeGrid.innerHTML = "<p>Please enter a recipe name 🍽️</p>";
    return;
  }

  recipeGrid.innerHTML = "";
  recipeGrid.appendChild(loader);

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
    const data = await res.json();

    recipeGrid.innerHTML = ""; // clear loader

    if (!data.meals) {
      recipeGrid.innerHTML = "<p>No recipes found! Try another dish 😋</p>";
      return;
    }

    data.meals.forEach(meal => {
      const card = document.createElement("a");
      card.href = meal.strYoutube || "#";
      card.target = "_blank";
      card.classList.add("recipe-card");

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="content">
          <h3>${meal.strMeal}</h3>
          <p><strong>Cuisine:</strong> ${meal.strArea}</p>
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          ${meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank">📺 Watch Recipe</a>` : ""}
        </div>
      `;
      recipeGrid.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    recipeGrid.innerHTML = "<p>⚠️ Error fetching recipes. Please try again later.</p>";
  }
}

// Event listeners
searchBtn.addEventListener("click", searchRecipe);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchRecipe();
});
