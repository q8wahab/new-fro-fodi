import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecipesByUser } from "../api/recipes";

const UserRecipe = () => {
  const { userId } = useParams();

  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["UserRecipes", userId],
    queryFn: () => getRecipesByUser(userId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Occurred: {error.message}</div>;

  const username = recipes?.[0]?.user?.username || "waiting for new Recipe";

  return (
    <div className="p-6">
      {/* {recipes?.map((recipe) => ( */}
      <h1 className="text-2xl font-bold mb-4 text-center">
        {/* I need to update this line Recipe by {username} */}
        {username}
      </h1>
      {/* ))} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes?.map((recipe) => (
          <div key={recipe._id} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p>Recipe ID: {recipe._id}</p>
              <h2 className="card-title">Title: {recipe.title}</h2>
              <p>User: {recipe.user.username}</p>
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
            <figure>
              <img
                src={
                  recipe.image
                    ? `http://localhost:8000/${recipe.image}`
                    : "path/to/default/placeholder.jpg"
                }
                alt={recipe.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://www.foodiesfeed.com/wp-content/uploads/2023/09/healthy-food.jpg";
                }}
              />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRecipe;
