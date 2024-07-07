import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../api/recipes";

function List() {
  const { data: RecipeData, isLoading } = useQuery({
    queryKey: ["getAllRecipes"],
    queryFn: getAllRecipes,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Recipe List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RecipeData?.map((recipe) => (
          <div key={recipe._id} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p>Recipe ID: {recipe._id}</p>
              <h2 className="card-title">Title: {recipe.title}</h2>
              <p>User: {recipe.user}</p>
              <p>Category: {recipe.category.name}</p>
              <p className="text-gray-500">
                Ingredients:{" "}
                {recipe.ingredients.length > 0
                  ? recipe.ingredients
                      .map((ingredient) => ingredient.name)
                      .join(", ")
                  : "No ingredients listed"}
              </p>
              <p>Prep Time: {recipe.prepTime} minutes</p>
              <p>Cook Time: {recipe.cookTime} minutes</p>
              <p>Total Time: {recipe.totalTime} minutes</p>
              {recipe.instructions && (
                <p>Instructions: {recipe.instructions}</p>
              )}
            </div>
            {recipe.image && (
              <figure>
                <img
                  src={`http://localhost:8000/${recipe.image}`}
                  alt={recipe.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "placeholder-image-url";
                  }}
                />
              </figure>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
