// All log examples and prints are commented out for part 1 to avoid clutter in the console when testing part 2.

"use strict";

const prompt = require("prompt-sync")();
const cakeRecipes = require("./cake-recipes.json");
// npm install prompt-sync to test prompts

// Return all authors
const getAllAuthors = (Recipes) => {
  const Authors = [];
  Recipes.forEach((Recipe) => {
    if (!Authors.includes(Recipe.Author)) {
      Authors.push(Recipe.Author);
    }
  });
  return Authors;
};

// Log the list of authors to the console
// console.log(getAllAuthors(cakeRecipes));

// Log the name of each recipe
const printRecipeNames = (Recipes) => {
  if (Recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }
  Recipes.forEach(({ Name }) => {
    console.log(Name);
  });
};

// Return all recipes of a given author
const getRecipesByAuthor = (Recipes, Author) => {
  return Recipes.filter((Recipe) => Recipe.Author === Author);
};

// Log the names of recipes by a given author
// const authorRecipes = getRecipesByAuthor(cakeRecipes, "Mary Cadogan");
// printRecipeNames(authorRecipes);

// Return recipes with a given ingredient
const getRecipesByIngredient = (Recipes, Ingredient) => {
  return Recipes.filter((Recipe) =>
    Recipe.Ingredients.some((ing) => ing.includes(Ingredient))
  );
};

// Log the names of recipes with a given ingredient
/* const ingredientRecipes = getRecipesByIngredient(
  cakeRecipes,
  "140g caster sugar"
);
printRecipeNames(ingredientRecipes);
*/

// Return a recipe by name
const getRecipeByName = (Recipes, Name) => {
  return Recipes.find((Recipe) => Recipe.Name.includes(Name));
};

// Log the recipe by name
// const recipe = getRecipeByName(cakeRecipes, "Simmer-&-stir Christmas cake");
// console.log(recipe);

// Return all ingredients of a recipe
const getAllIngredients = (Recipes) => {
  return Recipes.reduce((Ingredients, Recipe) => {
    return Ingredients.concat(Recipe.Ingredients);
  }, []);
};

// Log all ingredients of a recipe
/* if (recipe) {
  console.log("Ingredients of 'Simmer-&-stir Christmas cake':");
  console.log(recipe.Ingredients);
}
  
*/

// Part 2

// Saving ingredients of a recipe to an array
let savedIngredients = [];

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};

let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      // Logs all authors
      console.log(getAllAuthors(cakeRecipes));
      break;
    case 2:
      // Logs all recipes by author name
      const author = prompt("Enter the author's name: ");
      const authorRecipes = getRecipesByAuthor(cakeRecipes, author);
      printRecipeNames(authorRecipes);
      break;
    case 3:
      // Logs all recipes by ingredient
      const ingredient = prompt("Enter the ingredient: ");
      const ingredientRecipes = getRecipesByIngredient(cakeRecipes, ingredient);
      printRecipeNames(ingredientRecipes);
      break;
    case 4:
      // Logs a single recipe by name
      const recipeName = prompt("Enter the recipe name: ");
      const recipe = getRecipeByName(cakeRecipes, recipeName);
      console.log(recipe);
      // Saves ingredients of a recipe to savedIngredients array
      if (recipe) {
        const saveIngredients = prompt(
          "Do you want to save the ingredients of this recipe? (yes/no): "
        );
        if (saveIngredients.toLowerCase() === "yes") {
          savedIngredients = savedIngredients.concat(recipe.Ingredients);
        }
      }
      break;
    case 5:
      // Logs all ingredients of saved recipes from savedIngredients array
      console.log(getAllIngredients([{ Ingredients: savedIngredients }]));
      // Can also be done by logging savedIngredients array directly for cleaner code
      // console.log(savedIngredients);
      break;
    case 0:
      // Exits the displayMenu
      console.log("Exiting...");
      break;
    default:
      // Logs invalid input
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
