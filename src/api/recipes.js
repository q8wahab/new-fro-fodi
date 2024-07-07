import instance from ".";

const getAllRecipes = async () => {
  const { data } = await instance.get("/recipe");

  return data;
};
const createRecipes = async (recipeInfo) => {
  try {
    const res = await instance.post("/recipe", {
      category: recipeInfo.category,
      title: recipeInfo.title,
      ingredients: recipeInfo.ingredients,
      instructions: recipeInfo.instructions,
      prepTime: parseInt(recipeInfo.prepTime),
      cookTime: parseInt(recipeInfo.cookTime),
    });

    console.log("Response:", res);
    return res.data;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

const getRecipesByCategory = async (categoryId) => {
  const { data } = await instance.get(`/recipe/category/${categoryId}`);
  return data;
};

const getRecipesByUser = async (userId) => {
  const { data } = await instance.get(`/user/${userId}`);
  return data;
};

export { getAllRecipes, createRecipes, getRecipesByCategory, getRecipesByUser };
