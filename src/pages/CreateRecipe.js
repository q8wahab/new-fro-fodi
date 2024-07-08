import React, { useState, useEffect } from "react";
import { createRecipes } from "../api/recipes";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { getAllCategory } from "../api/category";
import { getAllIngredient } from "../api/ingrediant";

const queryClient = new QueryClient();

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchIngredients();
  }, []);

  const fetchCategories = async () => {
    const data = await getAllCategory();
    setAvailableCategories(data);
  };

  const fetchIngredients = async () => {
    const data = await getAllIngredient();
    setAvailableIngredients(data);
  };

  const getCategoryIdByName = (name) => {
    const category = availableCategories.find((cat) => cat.name === name);
    return category ? category.id : null;
  };

  const getIngredientIdsByName = (names) => {
    return names.split(",").map((name) => {
      const ingredient = availableIngredients.find(
        (ing) => ing.name === name.trim()
      );
      return ingredient ? ingredient.id : null;
    });
  };

  const { mutate } = useMutation({
    mutationKey: ["create Recipe"],
    mutationFn: () => {
      const categoryId = getCategoryIdByName(category);
      const ingredientIds = getIngredientIdsByName(ingredients);
      return createRecipes({
        category: categoryId,
        title,
        ingredients: ingredientIds,
        prepTime,
        cookTime,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"]);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate();
  };

  return (
    <div>
      <h1>Create Recipe</h1>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <div className="flex content-center flex-col space-x-4">
          <label
            htmlFor="category"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            className="w-44 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {availableCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <label
            htmlFor="title"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-44 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label
            htmlFor="ingredients"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Ingredients
          </label>
          <select
            id="ingredients"
            className="w-44 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedIngredients}
            onChange={(e) =>
              setSelectedIngredients(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            multiple
            required
          >
            {availableIngredients.map((ing) => (
              <option key={ing.id} value={ing.name}>
                {ing.name}
              </option>
            ))}
          </select>

          <label
            htmlFor="prepTime"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Prep Time
          </label>
          <input
            type="number"
            id="prepTime"
            className="w-44 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Preparation time in minutes"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
          />

          <label
            htmlFor="cookTime"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Cooking Time
          </label>
          <input
            type="number"
            id="cookTime"
            className="w-44 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cooking time in minutes"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
          />

          <button
            className="block py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700 px-4 py-3 mb-2 text-xs text-center text-white font-semibold bg-violet-600 hover:bg-violet-700 rounded-xl"
            type="submit"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipe;
